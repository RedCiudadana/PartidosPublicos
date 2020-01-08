import Route from '@ember/routing/route';

class TestRoute extends Route {
  queryParams = {
    page: { refreshModel: false },
    size: { refreshModel: false }
  };
}

export default TestRoute;
