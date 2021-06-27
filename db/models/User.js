

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
        },
        verificationToken: {
            type: DataTypes.STRING
        },
        isLoggedIn: {
            type:DataTypes.BOOLEAN,
            default: false
        },
        isDesktopLoggedIn : {
            type:DataTypes.BOOLEAN,
            default: false
        },
        mobileAppDeviceToken : {
           type:DataTypes.TEXT,
        },
        optedDailyReport : {
            type : DataTypes.BOOLEAN,
        },
        dailyReportJobId : {
            type : DataTypes.INTEGER,
        },
        optedWeeklyReport : {
            type : DataTypes.BOOLEAN,
        },
        weeklyReportJobId : {
            type : DataTypes.INTEGER,
        },
        monthlyReportDuration : {
            type : DataTypes.INTEGER,
        },
        monthlyReportJobId : {
            type : DataTypes.INTEGER,
        },
        partnerId : {
            type : DataTypes.INTEGER
        },
        transactionReportJobId : {
            type : DataTypes.INTEGER,
        },
        customerPaymentJobId:{
            type : DataTypes.INTEGER,
        },
        userReferrerId : {
            type: DataTypes.INTEGER,
        },
        referralCode : {
            type: DataTypes.STRING,
        },
        termsAndConditions : {
            type : DataTypes.BOOLEAN,
            default : true,
        },
        dailyReportWhatsapp : {
            type : DataTypes.BOOLEAN,
            default : true,
        },
        weeklyReportWhatsapp : {
            type : DataTypes.BOOLEAN,
            default : true,
        },
        whatsappNumber : {
            type : DataTypes.STRING,
        },
        signUpSource : {
            type: DataTypes.ENUM(["facebook", "linkedin", "reminder", "google"]),
        },
        signUpMedium : {
            type: DataTypes.ENUM(["mobile", "web"]),
        },
        firstSync: {
            type: DataTypes.DATE
        },
        utm_campaign: {
            type: DataTypes.STRING,
            allowNull: true
        },
        utm_source: {
            type: DataTypes.STRING,
            allowNull: true
        },
        utm_medium: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastDemoMail:{
            type:DataTypes.BIGINT
        },
        desktopAppVersion:{
            type : DataTypes.STRING
        }
    }, {
        tableName: 'users',
        paranoid : true,
        deletedAt : 'deletedAt',
    });
    User.associate = function (models) {
        // USER belongsToMany Organization
        User.belongsToMany(models.Organization, {
            through: {
                model: models.TagUserOrganization,
            },
            foreignKey: 'userId',
            otherKey: 'organizationId'
        });
    };
    return User;
};