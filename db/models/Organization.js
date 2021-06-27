'use strict';
module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tallyGuid : {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alias: {
            type: DataTypes.STRING,
        },
        sesAlias: {
            type: DataTypes.STRING,
            unique: true
        },
        erp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orgId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        gstNo: {
            type: DataTypes.STRING,
            // unique: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: DataTypes.TEXT,
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        pincode: DataTypes.STRING,
        phone: DataTypes.STRING,
        mobile: DataTypes.STRING,
        fax: DataTypes.STRING,

        lastVoucherDate: {
            type: DataTypes.DATEONLY,

        },

        altVchId : {
            type:   DataTypes.INTEGER
        },

        altMstId : {
            type:   DataTypes.INTEGER
        },

        numberOfLedgers: {
            type:   DataTypes.INTEGER
        },

        timing: {
            type:   DataTypes.INTEGER
        },

        order: {
            type: DataTypes.STRING
        },

        createdDate: {
            type:  DataTypes.DATEONLY
        },

        lastTallySync: {
            type: DataTypes.BIGINT,
        },
        lastZohoSync: {
            type: DataTypes.BIGINT
        },
        logo: {
            type: DataTypes.STRING
        },
        signature: {
            type: DataTypes.STRING
        },
        editSheetLink: {
            type: DataTypes.STRING
        },
        editSheetId : {
            type: DataTypes.STRING
        },
        smsMessangingId : {
            type: DataTypes.STRING
        },
        allowedAccessOfSms : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        sendPaymentTerm: {
            type: DataTypes.BOOLEAN,
            defaultValue : true
        },
        customFooter : {
            type : DataTypes.STRING,
            defaultValue : ""
        },
        useCustomFooter : {
            type :DataTypes.BOOLEAN,
            defaultValue : false

        },
        sendLedgerReportInReminders :{
            type :DataTypes.BOOLEAN,
            defaultValue : false
        },
        modifiedName : {
            type: DataTypes.STRING
        },
        allowedModeifiedName : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        customSMS : {
            type : DataTypes.TEXT,
            defaultValue : ""
        },
        useCustomSMS : {
            type :DataTypes.BOOLEAN,
            defaultValue : false

        },
        customMail : {
            type : DataTypes.TEXT,
            defaultValue : ""
        },
        useCustomMail : {
            type :DataTypes.BOOLEAN,
            defaultValue : false
        },
        interestRate : {
            type :DataTypes.FLOAT,
            defaultValue : 15
        },
        ccAdmin: {
            type: DataTypes.BOOLEAN,
        },
        ccAccountManager: {
            type: DataTypes.BOOLEAN,
        },
        credflowFooter: {
            type: DataTypes.BOOLEAN
        },
        useCustomWhatsapp: {
            type: DataTypes.BOOLEAN
        },
        customWhatsappContent: {
            type: DataTypes.TEXT
        }, 
        useCustomDeclaration: {
            type: DataTypes.BOOLEAN
        },
        customDeclarationContent: {
            type: DataTypes.TEXT
        },
        noReminderDays: {
            type: DataTypes.INTEGER,
            defaultValue: 7,
        },
        sendShortAmountReminder: {
            type : DataTypes.BOOLEAN
        },
        badDebtOverdueThreshold: {
            type: DataTypes.INTEGER
        },
        creditControlDays: {
            type: DataTypes.INTEGER,
        },
        creditControlAmount: {
            type: DataTypes.INTEGER,
        },
        requireReceiptApproval: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        pdcAmountPerc: {
            type: DataTypes.INTEGER,
        },
        sendInvoiceInMsgReminder : {
            type: DataTypes.BOOLEAN,
            default : true
        },
        isAlternateUnitVisible:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isRemoveBlankColumn:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'organizations',
        paranoid : true,
        deletedAt : 'deletedAt',
    });
    Organization.associate = function (models) {
        // USER belongsToMany Organization

        Organization.belongsToMany(models.User, {
            as: 'users',
            through: {
                model: models.TagUserOrganization,
            },
            foreignKey: 'organizationId',
            otherKey: 'userId'
        });
        
        Organization.hasOne(models.CredflowBank, {
            foreignKey: 'organizationId'
        });

        Organization.hasMany(models.Contact, {
            foreignKey: 'organizationId'
        });
    };
    return Organization;
};
