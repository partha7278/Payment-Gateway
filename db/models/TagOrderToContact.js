'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagOrderToContact = sequelize.define('TagOrderToContact', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      organizationId:{
        type : DataTypes.INTEGER,
          references : {
              model : 'organizations',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
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
      gatewayOrderId: {
        type: DataTypes.STRING
      },
      paymentGateway:{
        type: DataTypes.ENUM('razorpay'),
        defaultValue: 'razorpay'
      },
      amount:{
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      paidAmount:{
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      status:{
        type: DataTypes.ENUM('queue','success','failed','mismatched'),
        defaultValue: 'pending'
      },
  }, {
    tableName: 'tagOrderToContacts',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  TagOrderToContact.associate = function(models) {
      TagOrderToContact.belongsTo(models.Contact,{
            foreignKey : 'contactId'
      });

      TagOrderToContact.belongsTo(models.Organization,{
            foreignKey : 'organizationId'
      });

      TagOrderToContact.hasOne(models.CapturedTransaction,{
            foreignKey : 'tagOrderToContactsId'
      });
  };
  return TagOrderToContact;
};