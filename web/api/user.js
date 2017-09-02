
class UserService {

  static add(user) {
    if (localStorage) {
      localStorage.setItem('cvmaker_user', user.id);
    } else window.sendErr('No localStorage for this user');
  }

  static get() {
    return localStorage && localStorage.getItem('cvmaker_user');
  }
}

export default UserService;
