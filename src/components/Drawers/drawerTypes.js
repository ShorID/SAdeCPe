import DepartmentDrawer from "./DepartmentDrawer";
import EmployeesPositionDrawer from "./EmployeesPositionDrawer";
import ExemptionReasonsDrawer from "./ExemptionReasonsDrawer";
import OrgDrawer from "./OrgDrawer";
import PriorityLevelDrawer from "./PriorityLevelDrawer";
import StatesDrawer from "./StatesDrawer";
import TrainerDrawer from "./TrainerDrawer";
import TrainingCenterDrawer from "./TrainingCenterDrawer";

export const drawerTypes = {
  states: StatesDrawer,
  departments: DepartmentDrawer,
  employeesPosition: EmployeesPositionDrawer,
  trainingCenter: TrainingCenterDrawer,
  priorityLevel: PriorityLevelDrawer,
  org: OrgDrawer,
  trainer: TrainerDrawer,
  exemptionReasons: ExemptionReasonsDrawer,
};

export default drawerTypes;
