import { Router } from "express";
import { getProgramDetails, getPrograms, getTrack } from "./controllers.js";

const router = Router();

router.route("/programs").get(getPrograms);

router.route("/programDetails/:programId").get(getProgramDetails);

router.route("/track/:trackId").get(getTrack);

export default router;
