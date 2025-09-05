import { link } from "fs"
import Link from "next/link"

export default function Company() {
    return (
        <>
          <Link href="http://localhost:8000/users/2">user</Link><br/>
          <Link href="http://localhost:8000/users/3">user</Link> <br/>
          <Link href="http://localhost:8000/users/4">user</Link> <br/>
          <Link href="http://localhost:8000/users/5">user</Link><br/>
          <Link href="http://localhost:8000/users/6">user</Link><br/>
          <Link href="http://localhost:8000/users/7">user</Link><br/>
        </>

    )

}
