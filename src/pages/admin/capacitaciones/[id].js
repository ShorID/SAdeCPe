import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import TrainingSheet from "@/components/TrainingSheet";
import classNames from "classnames";

const items = ["primero", "segundo", "tercero", "cuarto", "quinto"];

const TrainingSheetPage = (props) => {
  const [animationState, setAnimationState] = React.useState({
    index: 0,
    showing: true,
  });
  const animationRef = React.useRef(null);

  const startAnimation = (l = items.length) => {
    clearTimeout(animationRef.current);
    if (l === 1) return null;
    animationRef.current = setTimeout(() => {
      setAnimationState((prev) =>
        items[prev.index + 1]
          ? {
              index: prev.index + 1,
              showing: !prev.showing,
            }
          : prev
      );
      startAnimation(l - 1);
    }, 3000);
  };

  React.useEffect(() => {
    startAnimation();
    return () => clearTimeout(animationRef.current);
  }, []);

  return (
    <AdminLayout>
      <TrainingSheet />
      <div className="testWrapper">
        <span className={"testHide"} key={animationState.index}>{items[animationState.index]}</span>
        <span className={"testShow"} key={animationState.index + 1}>{items[animationState.index + 1]}</span>
      </div>
    </AdminLayout>
  );
};

TrainingSheetPage.propTypes = {};

export default TrainingSheetPage;
