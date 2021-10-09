const Alert = ({ remove, alerts }) => {
  if (alerts) console.error('You have to provide alerts array');
  if (remove) console.error('Remove function should be provided');

  return (
    <>
      {alerts.length ? alerts.map(({ message, color }) => (
        <div
          className={`flex justify-between items-center px-5 py-3 bg-${color}-200 text-${color}-500 font-semibold mb-5 rounded-md cursor-pointer`}
        >
          <span>{message}</span>
          <i className="fas fa-times-circle cursor-pointer" onClick={remove}></i>
        </div>
      )) : null}
    </>
  );
};

export default Alert;
