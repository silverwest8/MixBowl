import { Button } from "@tremor/react";
import { deleteCookie } from "cookies-next";

export default function NavBar() {
  function logout() {
    deleteCookie("token");
    window.location.reload();
  }
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center font-bold text-xl">
              Cocktell 관리자 페이지
            </div>
          </div>
          <div className="flex items-center">
            <Button
              size="xs"
              variant="secondary"
              className="text-black border-black hover:bg-inherit"
              onClick={logout}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
