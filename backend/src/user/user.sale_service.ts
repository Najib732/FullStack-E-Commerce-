import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { Product } from "src/entity/product.entity";
import { Voucher } from "src/entity/voucher.entity";
import { OrderDetails } from "src/entity/order_details.entity";
import { Sell } from "src/entity/sell.entity";
import { Status } from "src/entity/status.entity";
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { promises } from "dns";

@Injectable()
export class SellService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Voucher) private voucherRepo: Repository<Voucher>,
    @InjectRepository(OrderDetails) private orderRepo: Repository<OrderDetails>,
    @InjectRepository(Sell) private sellRepo: Repository<Sell>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
    private readonly mailerService: MailerService
  ) { }

  async createSell(userId: number, items: { productId: number; quantity: number }[]) {
    const user = await this.userRepo.findOne({ where: { user_id: userId } });
    if (!user) throw new Error("User not found");
    let totalPrice = 0;
    const productsToUpdate: Product[] = [];
    for (const item of items) {
      const product = await this.productRepo.findOne({ where: { product_id: item.productId } });
      if (!product) throw new Error(`Product with ID ${item.productId} not found`);
      if (product.product_quantity < item.quantity)
        throw new Error(`Not enough stock for ${product.product_name}`);

      totalPrice += product.product_price * item.quantity;
      product.product_quantity -= item.quantity;
      productsToUpdate.push(product);
    }
    const lastVoucher = await this.voucherRepo.find({
      order: { vouchar_no: 'DESC' },
      take: 1
    });
    let newVoucherNo = 1;
    if (lastVoucher.length > 0) {
      newVoucherNo = Number(lastVoucher[0].vouchar_no) + 1;
    }
    const voucher = this.voucherRepo.create({
      vouchar_no: newVoucherNo.toString(),
      total_price: totalPrice
    });

    const savedVoucher = await this.voucherRepo.save(voucher);
    const pendingStatus = await this.statusRepo.findOne({ where: { name: "Pending" } });
    if (!pendingStatus) throw new Error('Pending status not found');
    const order = this.orderRepo.create({
      user,
      user_name: user.user_name,
      user_phone: user.mobile_no,
      user_email: user.email,
      order_date: new Date().toISOString(),
      status: pendingStatus
    });
    const savedOrder = await this.orderRepo.save(order);
    for (const item of items) {
      const product = productsToUpdate.find(p => p.product_id === item.productId);
      if (!product) throw new Error(`Product with ID ${item.productId} not found in productsToUpdate`);

      const sell = this.sellRepo.create({
        vouchar: savedVoucher,
        order: savedOrder,
        product,
        product_quantity: item.quantity,
        product_price: product.product_price,
      });

      await this.sellRepo.save(sell);
    }
    await this.productRepo.save(productsToUpdate);

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Order Confirmation - Voucher #${savedVoucher.vouchar_no}`,
      template: './confirmation',
      context: {
        name: user.user_name,
        voucherNo: savedVoucher.vouchar_no,
        totalPrice: totalPrice,
        year: new Date().getFullYear(),
      },
    });

    return {
      message: "Sale completed successfully",
      voucher_no: savedVoucher.vouchar_no,
      total_price: totalPrice
    };
  }

  async getOrderByVoucher(voucharNo: string) {
    const voucher = await this.voucherRepo.findOne({
      where: { vouchar_no: voucharNo },
      relations: ['sells', 'sells.product', 'sells.order', 'sells.order.user', 'sells.order.status']
    });

    if (!voucher) throw new Error(`Voucher ${voucharNo} not found`);

    const orders = voucher.sells.map(sell => ({
      product_name: sell.product.product_name,
      quantity: sell.product_quantity,
      product_price: sell.product_price,
      order_id: sell.order.order_id,
      order_date: sell.order.order_date,
      user_name: sell.order.user_name,
      user_phone: sell.order.user_phone,
      user_email: sell.order.user_email,
      order_status: sell.order.status.name
    }));

    return {
      voucher_no: voucher.vouchar_no,
      total_price: voucher.total_price,
      orders
    };
  }


  async orderStatus(id: number, orderId: number): Promise<string> {

    const value = await this.userRepo.findOne({
      where: { user_id: id },
      relations: ['seller'],
    });

    if (!value) throw new Error('User not found');

    if (value.Sell.order !== order.seller.id) {
      throw new Error('This order does not belong to you');
    }

    // Proceed to return order status
    return `Your order no ${orderId} is currently ${order.status.name}`;


  }

  /*
   const value = await this.userRepo.findOne({
    where: { user_id: id },
    relations: ['user'], 
  });
  */


  async deleteOrderByVoucher(voucherNo: string): Promise<{ message: string }> {

    const voucher = await this.voucherRepo.findOne({
      where: { vouchar_no: voucherNo },
      relations: ['sells', 'sells.order'],
    });

    if (!voucher) throw new Error(`Voucher ${voucherNo} not found`);


    for (const sell of voucher.sells) {
      await this.sellRepo.delete(sell.sell_id);
    }


    const orderIds = voucher.sells.map(s => s.order.order_id);
    for (const orderId of orderIds) {
      await this.orderRepo.delete(orderId);
    }

    await this.voucherRepo.delete(voucher.vouchar_no);

    return { message: `Voucher ${voucherNo} and its orders deleted successfully` };
  }


}
