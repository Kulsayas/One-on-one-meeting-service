import { Router } from "express";
import { getManagerTeamMember } from "../controller/manager.controller.js";

const router = Router();

router.get("/:manager_id", getManagerTeamMember);

export default router;
