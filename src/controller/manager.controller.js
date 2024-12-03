import managerModel from "../model/managers.js";

export const getManagerTeamMember = async (req, res, next) => {
  try {
    const managerId = req.params.manager_id || "";

    const managerValue = await managerModel.findById(managerId);

    const memberList = managerValue.teams;

    if (!memberList) {
      res.status(400).send({
        status: "failure",
        message: "members not found",
      });
      return;
    }
    res.status(200).send({
      data: memberList,
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      status: "failure",
      message: "Internal server error.",
    });
  }
};

export const getMemberById = async (id) => {
  try {
    const existMember = await memberModel.findById(id);
    if (!existMember) {
      res.status(400).send({
        status: "failure",
        message: "team member not found.",
      });
    }
    return existMember;
  } catch (error) {}
};
