import { Router } from "express";

const router = Router();

router.get("/test", async (req, res) => {
  return res.json({ message: "Rota de teste" }).status(200);
});

export default router;
