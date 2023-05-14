// pages/api/user.ts

import { sessionOptions } from "@/lib/utils/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    res.send({ jwt: req.session.jwt });
  },
  sessionOptions
);