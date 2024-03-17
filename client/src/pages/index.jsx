import { useEffect } from "react";
import { useRouter } from "next/router";

import Main from "./../components/Main";
import Login from './login';

function Index() {
  // const user = null; // Thay thế giá trị này bằng giá trị của người dùng thực tế
  // const router = typeof window !== "undefined" ? useRouter() : null;

  // useEffect(() => {
  //   if (user === null && router) {
  //     router.push("/login");
  //   }
  // }, [user, router]);

  return <Main />;
}

export default Index;

// https://www.youtube.com/watch?v=keYFkLycaDg
// 4:51:49
