'use strict';
module.exports = (sequelize, DataTypes) => {
  const VirtualAccuntsOfContact = sequelize.define('VirtualAccuntsOfContact', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      contactId:{
          type : DataTypes.INTEGER,
          references : {
              model : 'contacts',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
      },
      paymentGateway:{
        type: DataTypes.ENUM('razorpay'),
        defaultValue: 'razorpay'
      },
      gatewayVirtualAccountId: {
        type: DataTypes.STRING
      },
      sharedDetails:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      accountCreationDate:{
        type: DataTypes.DATE
      },
      isAccountActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
      }
  }, {
    tableName: 'virtualAccuntsOfContacts',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  VirtualAccuntsOfContact.associate = function(models) {
      VirtualAccuntsOfContact.belongsTo(models.Contact,{
          foreignKey : 'contactId'
      });

      VirtualAccuntsOfContact.hasOne(models.TagVirtualAccountsToDetail, {
          foreignKey: 'virtualAccuntsOfContactsId'
      });
  };
  return VirtualAccuntsOfContact;
};