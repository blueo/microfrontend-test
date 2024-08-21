export default {
  title: 'Styleguide'
};

export const Table = () => ({
  template: `
      <div class="main">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@motto</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Sarah</td>
              <td>Connor</td>
              <td>@sconnor</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@larrythebird</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
});
