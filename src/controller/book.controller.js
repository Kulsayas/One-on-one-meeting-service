import bookModel from "../model/books.js";

export const getBooks = async (req, res) => {
  try {
    const bookList = (await bookModel.find()) || [];
    res.status(200).send({
      data: bookList,
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      status: "failure",
      message: "Internal server error.",
    });
  }
};

const getEndTime = (startTime, duration) => {
  return new Date(startTime.getTime() + duration * 60000);
};

export const createBook = async (req, res) => {
  try {
    const { manager_id, slot, duration, staff_id } = req.body;

    const startTime = new Date(slot);
    const endTime = getEndTime(startTime, duration);

    const books = await bookModel.find();
    const isOverlap = books.some((slot) => {
      return (
        startTime <
          slot.time_slot + getEndTime(slot.time_slot, slot.duration) &&
        endTime > slot.time_slot
      );
    });

    if (isOverlap) {
      res.status(400).send({
        status: "failure",
        message: "The meeting book is overlap.",
      });
    }

    const newBook = new bookModel({
      manager_id,
      slot,
      duration,
      staff_id,
    });

    await newBook.save();

    res.status(201).send({
      message: "created",
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      status: "failure",
      message: "Internal server error.",
    });
  }
};

export const editTimeSlot = async (req, res) => {
  try {
    const meetingId = req.params.meeting_id;

    const { slot, duration } = req.body;

    const startTime = new Date(slot);
    const endTime = getEndTime(startTime, duration);

    const books = await bookModel.find();
    const isOverlap = books.some((slot) => {
      return (
        startTime <
          slot.time_slot + getEndTime(slot.time_slot, slot.duration) &&
        endTime > slot.time_slot
      );
    });

    if (isOverlap) {
      res.status(400).send({
        status: "failure",
        message: "The meeting book is overlap.",
      });
    }

    await bookModel.findOneAndUpdate(
      { _id: meetingId },
      { slot: startTime, duration },
      { new: true }
    );

    res.status(200).send({
      message: "updated",
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      status: "failure",
      message: "Internal server error.",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const meetingId = req.params.meeting_id;
    const existingMeeting = await bookModel.findById({ meetingId });
    if (!existingMeeting) {
      res.status(400).send({
        status: "failure",
        message: "Meeting not found.",
      });
    }
    await bookModel.findOneAndDelete({ meetingId });
    res.status(200).send({
      message: "deleted.",
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      status: "failure",
      message: "Internal server error.",
    });
  }
};
