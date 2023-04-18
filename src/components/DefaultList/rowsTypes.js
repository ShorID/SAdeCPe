import TrainingListItem from "../TrainingListItem";
import DepartmentRows from "./DepartmentRows";
import EmployeesPositionRows from "./EmployeesPositionRows";
import EmployeesRows from "./EmployeesRows";
import OrgRows from "./OrgRows";
import StateRows from "./StateRows";
import TrainingCenterRows from "./TrainingCenterRows";

export default {
  training: TrainingListItem,
  states: StateRows,
  priorityLevel: StateRows,
  departments: DepartmentRows,
  employeesPosition: EmployeesPositionRows,
  trainingCenter: TrainingCenterRows,
  org: OrgRows,
  employees: EmployeesRows
};
