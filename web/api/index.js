
import ResumeService from './resume';
import UserService from './user';

if (localStorage) {
  localStorage.removeItem('cvdata');
  localStorage.removeItem('design');
  localStorage.removeItem('template');
}

export {ResumeService, UserService};