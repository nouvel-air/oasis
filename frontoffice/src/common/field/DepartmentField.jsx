import { useRecordContext } from 'react-admin';
import get from 'lodash/get';
import departments from '../../config/departments.json';

const DepartmentField = ({ source }) => {
  const record = useRecordContext();
  const postalCode = get(record, source);
  if (postalCode) {
    const code = postalCode.substr(0,2) === '97' ? postalCode.substr(0,3) : postalCode.substr(0,2);
    const department = departments.find(d => d.num_dep.toString() === code);
    if (department) return department.dep_name;
  }
  return '';
};

export default DepartmentField;