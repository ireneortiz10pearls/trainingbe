const { asClass, createContainer, asFunction, asValue } = require('awilix');

// app start
const StartUp = require('./startup');
const Server = require('./server');
const config = require('../config/environments');

// routes
const Routes = require('../api/routes');
const UserRoutes = require('../api/routes/user.routes');
const CourseRoutes = require('../api/routes/course.routes');
const CourseChapterRoutes = require('../api/routes/coursechapter.routes');
const AuthRoutes = require('../api/routes/auth.routes');
const CategoryRoutes = require('../api/routes/category.routes');
const SettingRoutes = require('../api/routes/setting.routes');
const TrainingPathRoutes = require('../api/routes/trainingpath.routes');

// business
const {
  UserBusiness,
  CourseBusiness,
  CourseChapterBusiness,
  SettingGroupBusiness,
  SettingBusiness,
  CategoryBusiness,
  TrainingPathBusiness,
  TrainingPathStatusBusiness,
} = require('../domain/');

// controllers
const {
  UserController,
  CourseController,
  CourseChapterController,
  AuthController,
  CategoryController,
  SettingController,
  TrainingPathController,
} = require('../api/controllers');

// services
const {
  UserService,
  CourseService,
  CourseChapterService,
  SettingGroupService,
  SettingService,
  CategoryService,
  TrainingPathService,
  TrainingPathStatusService,
  UtilsService,
} = require('../services');

// repositories
const {
  UserRepository,
  SettingGroupRepository,
  SettingRepository,
  CourseRepository,
  CategoryRepository,
  CourseChapterRepository,
  TrainingPathRepository,
  TrainingPathStatusRepository,
} = require('../dal/repositories');

// db
const db = require('../dal/models');

const container = createContainer();

container
  .register({
    app: asClass(StartUp).singleton(),
    router: asFunction(Routes).singleton(),
    server: asClass(Server).singleton(),
    UserController: asClass(UserController).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    CourseController: asClass(CourseController).singleton(),
    CourseRoutes: asFunction(CourseRoutes).singleton(),
    CourseChapterController: asClass(CourseChapterController).singleton(),
    CourseChapterRoutes: asFunction(CourseChapterRoutes).singleton(),
    AuthController: asClass(AuthController).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    CategoryController: asClass(CategoryController).singleton(),
    CategoryRoutes: asFunction(CategoryRoutes).singleton(),
    SettingController: asClass(SettingController).singleton(),
    SettingRoutes: asFunction(SettingRoutes).singleton(),
    TrainingPathController: asClass(TrainingPathController).singleton(),
    TrainingPathRoutes: asFunction(TrainingPathRoutes).singleton(),
  })
  .register({
    config: asValue(config),
  })
  .register({
    db: asValue(db),
  })
  .register({
    UserService: asClass(UserService).singleton(),
    CourseService: asClass(CourseService).singleton(),
    SettingGroupService: asClass(SettingGroupService).singleton(),
    SettingService: asClass(SettingService).singleton(),
    CategoryService: asClass(CategoryService).singleton(),
    CourseChapterService: asClass(CourseChapterService).singleton(),
    TrainingPathService: asClass(TrainingPathService).singleton(),
    TrainingPathStatusService: asClass(TrainingPathStatusService).singleton(),
    UtilsService: asClass(UtilsService).singleton(),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    SettingGroupRepository: asClass(SettingGroupRepository).singleton(),
    SettingRepository: asClass(SettingRepository).singleton(),
    CourseRepository: asClass(CourseRepository).singleton(),
    CategoryRepository: asClass(CategoryRepository).singleton(),
    CourseChapterRepository: asClass(CourseChapterRepository).singleton(),
    TrainingPathRepository: asClass(TrainingPathRepository).singleton(),
    TrainingPathStatusRepository: asClass(
      TrainingPathStatusRepository
    ).singleton(),
  })
  .register({
    UserBusiness: asClass(UserBusiness).singleton(),
    CourseBusiness: asClass(CourseBusiness).singleton(),
    SettingGroupBusiness: asClass(SettingGroupBusiness).singleton(),
    SettingBusiness: asClass(SettingBusiness).singleton(),
    CategoryBusiness: asClass(CategoryBusiness).singleton(),
    CourseChapterBusiness: asClass(CourseChapterBusiness).singleton(),
    TrainingPathBusiness: asClass(TrainingPathBusiness).singleton(),
    TrainingPathStatusBusiness: asClass(TrainingPathStatusBusiness).singleton(),
  });

module.exports = container;
