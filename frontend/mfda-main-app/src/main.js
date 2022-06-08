/* global System */


const setError = (error) => {
  const loadingTempl = document.querySelector('body #ssl-loading');
  const errorTempl = document.querySelector('body #ssl-error');
  const loadingIconTempl = document.querySelector('body #ssl-icon-loading');
  const errorIconTempl = document.querySelector('body #ssl-icon-error');

  loadingTempl.classList.add('display-flex');
  errorTempl.classList.remove('display-none');
  errorIconTempl.classList.remove('display-none');
  loadingIconTempl.classList.add('display-none');

  errorTempl.innerHTML = `
      <h2>Failed to load <b>${error?.appOrParcelName}</b></h2> 
      <p>${
        error.message.replace(/\bhttps?:\/\/\S+/gi, '<a href="$&" target="_blank" rel="nofollow">$&</a>')
      }</p>`;
  errorTempl.classList.add('display-block');
};

const onLoaded = () => {
  const loadingTempl = document.querySelector('body #ssl-loading');
  const errorTempl = document.querySelector('body #ssl-error');
  const loadingIconTempl = document.querySelector('body #ssl-icon-loading');
  const errorIconTempl = document.querySelector('body #ssl-icon-error');

  loadingTempl.classList.add('display-none');
  errorTempl.classList.add('display-none');
  loadingIconTempl.classList.add('display-none');
  errorIconTempl.classList.add('display-none');
};

(async () => {
  const modules = await Promise.all([
    System.import('single-spa'),
    System.import('single-spa-layout'),

    // todo change to angular
    System.import('vue'),
    System.import('vue-router'),

    System.import('react'),
    System.import('react-dom'),
    System.import('axios')
  ]);

  const singleSPA = modules[0];
  const singleSPALayout = modules[1];

  const rootProps = {
    props: {
      setLoadingState: (...rest) => console.log(`-@@@`, ...rest),
    },
  };
  const propsData = {
    props: {...rootProps},
  };

  let routes = singleSPALayout.constructRoutes(
    document.querySelector('#single-spa-layout'),
    propsData,
  );
  const applications = singleSPALayout.constructApplications({
    routes,
    loadApp({name}) {
      return System.import(name);
    },
  });

  const layoutEngine = singleSPALayout.constructLayoutEngine({
    routes,
    applications,
  });

  applications.forEach((app) => singleSPA.registerApplication(app));
  layoutEngine.activate();

  singleSPA.addErrorHandler((err) => {
    const appName = err.appOrParcelName;
    const appStatus = singleSPA.getAppStatus(appName);

    setError(err)
  });

  window.addEventListener('single-spa:routing-event', () => {
    onLoaded();
  });

  singleSPA.start();

})().catch((err) => {
  setError(err);
});
