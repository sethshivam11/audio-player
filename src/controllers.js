import Program from "./models/program.model.js";
import Track from "./models/track.model.js";

const getPrograms = async (_, res) => {
  try {
    const programs = await Program.find().select("-milestones");

    if (!programs || !programs?.length) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No programs found",
      });
    }

    return res.status(200).json({
      success: true,
      data: programs,
      message: "Programs found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

const getProgramDetails = async (req, res) => {
  try {
    const { programId } = req.params;
    if (!programId) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Program id is required",
      });
    }

    const program = await Program.findById(programId).populate("track.title");

    if (!program) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No program found",
      });
    }

    return res.status(200).json({
      success: true,
      data: program,
      message: "Program found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

const getTrack = async (req, res) => {
  try {
    const { trackId } = req.params;
    if (!trackId) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Track id is required",
      });
    }

    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No track found",
      });
    }

    return res.status(500).json({
      success: true,
      data: track,
      message: "Track found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

export { getPrograms, getProgramDetails, getTrack };
