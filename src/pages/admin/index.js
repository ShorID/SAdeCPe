import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import { getRandomAvatar, getRandomDate, getRandomInt, getRandomText } from "@/services/common";
import moment from "moment";

const getDefaultSessions = () => {
  const arrayWidth = getRandomInt(10);
  const currentDate = new Date();
  let sessions = [];
  const dateEnd = new Date(2024, 1, 1);
  let lastDate = currentDate;
  for (let index = 0; index < arrayWidth; index++) {
    const completed = !!(getRandomInt(2) - 1);
    const sessionDate = getRandomDate(lastDate, dateEnd);
    if (sessionDate > lastDate) lastDate = sessionDate;
    sessions.push({
      date: sessionDate,
      completed,
      description: `Esta sesion ${
        sessionDate < currentDate && !completed ? "no" : ""
      } se ${completed ? "realizó" : "realizará"} el dia ${moment(
        sessionDate
      ).calendar()}`,
      title: `Sesion numero: ${index + 1}`,
    });
  }
  return sessions;
};

const defaultItems = () => {
  const arrayWidth = getRandomInt(20);
  let items = [];
  for (let index = 0; index < arrayWidth; index++) {
    items.push({
      avatar: getRandomAvatar(),
      title: getRandomText({ min: 10, max: 30 }),
      completed: !!(getRandomInt(2) - 1),
      sessions: getDefaultSessions(),
    });
  }
  return items;
};

const Admin = (props) => {
  return (
    <AdminLayout>
      <DefaultList
        title="Capaciaciones"
        listId="training"
        getDefaultItems={defaultItems}
      />
    </AdminLayout>
  );
};

Admin.propTypes = {};

export default Admin;
