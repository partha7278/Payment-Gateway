'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.INTEGER
    },
    contactName: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING
    },
    paymentTerms: {
      type: DataTypes.STRING
    },
    credflowPaymentTerms: {
      type: DataTypes.STRING
    },
    parent: {
      type: DataTypes.STRING,
    },
    gstNo: {
      type: DataTypes.STRING,
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: DataTypes.STRING,
    mobile: DataTypes.STRING,
    website: DataTypes.STRING,
    billingAddress: DataTypes.TEXT,
    shippingAddress: DataTypes.TEXT,
    incomeTaxNumber: DataTypes.STRING,
    alterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isBranch: DataTypes.BOOLEAN,
    isCustomer: DataTypes.BOOLEAN,
    isVendor: DataTypes.BOOLEAN,
    openingBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    closingBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isDebitOpenBal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isDebitCloseBal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    toDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    unmatchedOB: {
      type: DataTypes.FLOAT,
      default: 0
    },
    receiverTurnOverTime: {
      type: DataTypes.INTEGER
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'bad', 'short'),
      default: 'low'
    },
    type:{
      type:DataTypes.ENUM('Bank Accounts', 'Cash Accounts', 'Sales Accounts', 'Duties & Taxes','Direct Expenses','Indirect Expenses','Vendor','Customer','Branch','Other')
    },
    accountManagerId: DataTypes.INTEGER,
    isCashLedger: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    schemeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    shortPayment: {
      type: DataTypes.BOOLEAN
    },
    isCredflowDebtor: {
      type : DataTypes.BOOLEAN,
      default : false
    },
    isCredflowCreditor: {
      type : DataTypes.BOOLEAN,
      default : false
    },
    isCreditControl: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    creditControlDays: {
      type: DataTypes.INTEGER,
    },
    creditControlAmount: {
        type: DataTypes.INTEGER,
    },
    rto: {
      type: DataTypes.FLOAT,
    },
    tpd: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    projectedCollectionParams: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
    },
    creditControlFromOrg: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    onAccountValue : {
      type: DataTypes.FLOAT,
      defaultValue : 0,
    },
    hsnDescription: {
      type : DataTypes.ARRAY(DataTypes.STRING),
      defaultValue : []
    },
    hsnCode:{
      type : DataTypes.ARRAY(DataTypes.STRING),
      defaultValue : []
    }
  }, {
    tableName: 'contacts',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
    });

    Contact.belongsTo(models.User,{
      foreignKey : 'accountManagerId'
    });
    
  };
  return Contact;
};