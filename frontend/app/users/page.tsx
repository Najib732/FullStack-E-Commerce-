import Link from "next/link";


export default function User(){
    return(
        <>
        <h1>Users</h1>
        <Link href="users/1">users 1</Link> <br/>
        <a href="users/2">users 2</a> <br/>
        <a href="users/3">users 3</a> <br/>
        <a href="users/4">users 4</a> <br/>
        <a href="users/5">users 5</a> <br/>
        </>
    );
}