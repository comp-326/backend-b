import { BaseRouter } from '@comp326-common/routes/baseRouter';

class UserRouter extends BaseRouter{

	route(){
		this.router.get('/',(req,res)=>{
            
			return res.status(200).json('Users');
		});

		return this.router;
	}
}

export default new UserRouter();