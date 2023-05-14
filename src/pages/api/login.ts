import { sessionOptions } from "@/lib/utils/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // set jwt to iron session
    req.session.jwt = req.body.jwt;
    await req.session.save()
    res.send({ ok: true });
  },
  sessionOptions,
);