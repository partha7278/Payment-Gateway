'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagUserOrganization = sequelize.define('TagUserOrganization', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
    isPrimaryAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    allowedSettings: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    allowedPayables: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    allowedReports: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    allowedBanks: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    allowedAllAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    invoiceStart: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    bucketSize: {
      type: DataTypes.STRING,
      defaultValue: "15"
    },
    tagAdminManagerId: {
      type: DataTypes.INTEGER,
      // allowNull: false // do this later when database has no null values
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    automatedSendInvoice : {
      type: DataTypes.BOOLEAN
    },
    automatedSendCustomerPayment : {
      type: DataTypes.BOOLEAN
    },
    ledgerClassification : {
      type: DataTypes.ENUM('CREDFLOW','TALLY'),
      default : 'TALLY',
    },
    sendInvoiceInReminder : {
      type: DataTypes.BOOLEAN,
      default : true
    },
    canApproveReceipts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'tagUserOrganization',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  TagUserOrganization.associate = function (models) {
    // USER belongsToMany Organization
    TagUserOrganization.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });

    TagUserOrganization.belongsTo(models.Organization, {
      as: 'organization',
      foreignKey: 'organizationId'
    });
  };
  return TagUserOrganization;
};