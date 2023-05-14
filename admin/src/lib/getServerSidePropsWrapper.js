import { getCookie } from "cookies-next";
export const withAuth = (getServerSideProps) => async (ctx) => {
  const { req, res } = ctx;
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permenant: false,
      },
    };
  }
  let ret = { props: {} };
  if (getServerSideProps) {
    ret = await getServerSideProps(ctx, token);
  }
  return ret;
};
