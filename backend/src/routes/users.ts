import express, { Request, Response, NextFunction } from "express";

const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = new User(req.body);
      await user.save();
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // [1] collection에서 존재하는지 찾고
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send("Auth failed, email not found.");
      }

      // [2] 비밀번호가 올바른지 체크 (boolean)
      const isMatch = await user.comparePassword(req.body.password);
      if (!isMatch) {
        return res.status(400).send("Wrong password.");
      }

      // [3] jwt token 생성
      const payload = {
        userId: user._id.toHexString(),
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;