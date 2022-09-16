import React, { useEffect, useState } from "react";
import ScheduleView from "./presenter/ScheduleView";
import { addDocument, dbService, getDocuments } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

function ScheduleData(props) {
  const { userObj } = props;
  const today = new Date();
  const [term, setTerm] = useState({
    started_at: `${today.getFullYear()}-${today.getMonth() + 1}-${1}`,
    ended_at: `${today.getFullYear()}-${today.getMonth() + 1}-${31}`,
  });
  const [schedules, setSchedules] = useState([]);

  const addSchedule = async (
    uid,
    title,
    category,
    started_at,
    ended_at,
    started_time,
    ended_time,
    participants,
    content
  ) => {
    try {
      await addDocument("schedule", {
        uid,
        title,
        category,
        started_at: Timestamp.fromDate(new Date(started_at)),
        ended_at: "",
        started_time,
        ended_time,
        participants,
        content,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      console.log("finally");
      getSchedule(uid, term.started_at, term.ended_at);
    }
  };

  const getSchedule = async (uid, started_at, endeded_at) => {
    const scheduleRef = collection(dbService, "schedule");
    const q = query(
      scheduleRef,
      where("uid", "==", uid),
      where("started_at", ">=", started_at),
      orderBy("started_at"),
      orderBy("started_time")
    );

    const data = await getDocuments(q);
    let dataGroup = [];
    if (data.size !== 0) {
      data.forEach((doc) => {
        if (new Date(doc.data().started_at.toDate()) <= new Date(endeded_at)) {
          console.log(doc);
          dataGroup.push({ id: doc.id, ...doc.data() });
        } else {
          return false;
        }
      });
    }

    setSchedules(dataGroup);
  };

  const onAddSchedule = async (newSchedule) => {
    let uid = userObj.uid;
    let title = newSchedule.title;
    let category = newSchedule.category;
    let started_at = newSchedule.started_at;
    let ended_at = newSchedule.ended_at;
    let started_time = newSchedule.started_time;
    let ended_time = newSchedule.ended_time;
    let participants = newSchedule.participants;
    let content = newSchedule.content;

    await addSchedule(
      uid,
      title,
      category,
      started_at,
      ended_at,
      started_time,
      ended_time,
      participants,
      content
    );
  };

  const onSetDate = (selectedDate, curDates) => {
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();

    let s = "";
    let e = "";

    if (curDates[0] !== 1) s = new Date(year, month - 1, curDates[0]);
    else s = new Date(year, month, curDates[0]);

    if (curDates[curDates.length - 1] < 7)
      e = new Date(year, month + 1, curDates.pop());
    else e = new Date(year, month, curDates.pop());

    setTerm({
      started_at: new Date(s.getFullYear(), s.getMonth(), s.getDate()),
      ended_at: `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`,
    });
  };

  useEffect(() => {
    getSchedule(userObj.uid, term.started_at, term.ended_at);
  }, [term]);

  useEffect(() => {
    return () => getSchedule(userObj.uid, term.started_at, term.ended_at);
  }, []);

  return (
    <ScheduleView
      scheduleList={schedules}
      onAddSchedule={onAddSchedule}
      onSetDate={onSetDate}
    />
  );
}

export default ScheduleData;
