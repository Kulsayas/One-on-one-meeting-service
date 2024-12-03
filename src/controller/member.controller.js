import React from "react";

export const getMembers = async (req, res, next) => {
  try {
    const memberList = await memberModel.find({});
    res.status(200).send({
      data: memberList,
    });
  } catch (error) {
    res.staus(400).send({
      status: "failure",
      message: err.message,
    });
    next();
  }
};
