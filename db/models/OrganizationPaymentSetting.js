'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationPaymentSetting = sequelize.define('OrganizationPaymentSetting', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      organizationId : {
          type : DataTypes.INTEGER,
          references : {
              model : 'organizations',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
      },
      paymentOnboardingComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isAllowedInvoiceRef : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      automaticReceiptSharing : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isCardPayment : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isNetBanking : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isUPI : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      chargeDebtorOnCardPayment : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      chargeDebtorOnNetBanking : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      chargeDebtorOnUPI : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      sendReceiptAsRegular : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      autoApproveAndSendToTally : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      autoSettleToDefaultAccount : {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      moneyHoldingDays : {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
  }, {
    tableName: 'organizationPaymentSettings',
    paranoid : true,
    deletedAt : 'deletedAt',
  });

  OrganizationPaymentSetting.associate = function(models) {
    OrganizationPaymentSetting.belongsTo(models.Organization, {
      foreignKey: 'organizationId'
    });
  };
  return OrganizationPaymentSetting;

}