import express from 'express';
import productCtrl from '../controllers/product.controller.js';

const router = express.Router();

// Define product routes
router.route('/api/products')
  .get(productCtrl.list)
  .post(productCtrl.create);

router.route('/api/products/:productId')
  .get(productCtrl.read)
  .put(productCtrl.update)
  .delete(productCtrl.remove);

// Middleware to handle route parameter
router.param('productId', productCtrl.productByID);
router.route('/api/products').post(productCtrl.create) 
router.route('/api/products').get(productCtrl.list)

router.route('/api/products/removeAll').delete(productCtrl.removeAll);

router.param('productId', productCtrl.productByID)
router.route('/api/products/:productId').get(productCtrl.read)
router.route('/api/products/:productId').put(productCtrl.update)
router.route('/api/products/:productId').delete(productCtrl.remove)



export default router;
