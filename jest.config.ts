module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@store/(.*)$": "<rootDir>/app/store/$1",
    "^@functions/(.*)$": "<rootDir>/app/functions/$1",
    "^@components/(.*)$": "<rootDir>/app/components/$1",
    "^@theme/(.*)$": "<rootDir>/app/theme/$1",
    "^@view_models/(.*)$": "<rootDir>/app/view_models/$1",
    "^@hooks/(.*)$": "<rootDir>/app/hooks/$1",
  },
};
