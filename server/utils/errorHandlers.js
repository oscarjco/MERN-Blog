const databaseErrorHandler = (res, error) => {
    return res.status(500).json({
      status: `error`,
      message: `Database operation failed. Reason: ${error.message}`,
    });
  };
  
  const notFoundErrorHandler = (res) => {
    return res.status(404).json({
      status: `error`,
      message: `Cannot find any item with that params`,
    });
  };

  export {databaseErrorHandler, notFoundErrorHandler}