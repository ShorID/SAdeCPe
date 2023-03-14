import React from "react";
import PropTypes from "prop-types";
import ActivityCalendar from "react-activity-calendar";
import Collapse from "../Collapse";
import ScheduleBadges from "../ScheduleBadges";
import moment from "moment";

const TrainingListItemSchedule = (props) => {
  const [schedule, setSchedule] = React.useState();
  React.useEffect(() => {
    if (Array.isArray(props.data) && props.data.length)
      setSchedule(
        props.data.map((item) => ({
          date: moment(item.date).format("YYYY-MM-DD"),
        }))
      );
  }, [props.data]);

  return (
    Array.isArray(props.data) &&
    !!props.data.length && (
      <Collapse
        header={<ScheduleBadges sessions={props.data} />}
        className="my-2"
      >
        {schedule && (
          <ActivityCalendar
            data={schedule}
            blockRadius={20}
            labels={{
                tooltip: 'wtf',
            }}
            hideColorLegend
            hideTotalCount
          >
          </ActivityCalendar>
        )}
      </Collapse>
    )
  );
};

TrainingListItemSchedule.propTypes = {
  data: PropTypes.array,
};

export default TrainingListItemSchedule;
