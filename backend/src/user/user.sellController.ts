import { Body, Controller, Post, Get, Param, Put, UseGuards, UsePipes, ValidationPipe, Req, ParseIntPipe, Delete } from "@nestjs/common";
import { SellService } from "./user.sale_service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { salesDTO } from "src/pipes/salesDTO";
import type { RequestWithSession } from "./session.interface";
import { UpdateOrderDto } from "src/pipes/UpdateOrderDto";


@Controller("sell")
export class SellController {
  constructor(private readonly sellService: SellService) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createSell(@Body() salesDTO, @Req() req: RequestWithSession): Promise<{ message: string; voucher_no: string; total_price: number; }> {
    const id = req.session.user.user_id;
    return this.sellService.createSell(id, salesDTO.items);
  }

  @UseGuards(JwtAuthGuard)
  @Get("voucher/:voucharNo")
  async getOrderByVoucher(@Param("voucharNo") voucharNo: string) {
    return this.sellService.getOrderByVoucher(voucharNo);
  }
 

  @UseGuards(JwtAuthGuard)
  @Get("/status/:id")
  async orderStatus(@Param("id", ParseIntPipe) id: number) {
    return this.sellService.orderStatus(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("voucher/:voucharNo")
  async deleteOrder(@Param("voucharNo") voucharNo: string) {
    return this.sellService.deleteOrderByVoucher(voucharNo);
  }

   /*
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Put("update")
    async updateOrder(
      @Body() body: UpdateOrderDto,
      @Req() req: RequestWithSession
    ) {
      const userId = req.session.user.user_id;
      return this.sellService.updateOrder(userId, body.orderId, body.items);
    }
  
  */

}
