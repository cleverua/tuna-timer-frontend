export class User {
  public name: string;
  public id: string;
  public teamId: string;
  public extTeamName: string;
  public imageUrl: string;
  public isAdmin: boolean;

  constructor(public jwt: string) {
    let userData = this.parseJwt(jwt);
    if (userData != null) {
      this.name = userData.name;
      this.id = userData.user_id;
      this.teamId = userData.team_id;
      this.extTeamName = userData.ext_team_name;
      this.imageUrl = userData.image48;
      this.isAdmin = userData.is_team_admin;
      this.jwt = jwt;
    }
  }

  parseJwt (token) {
    // TODO: check token. If can't parse return nil
    try {
      let payload = token.split('.')[1];
      let data = payload.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(data));
    } catch(e) {
      console.log(e.name, e.message)
      return null
    }
  };
}
