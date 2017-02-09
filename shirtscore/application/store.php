<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH.'libraries/facebook/facebook.php';

class Store extends CI_Controller {
	public function __construct(){
		parent::__construct();		
		clear_cache();		
		$this->load->model('store_model');
		$this->config->load('facebook');
		// $this->output->enable_profiler(TRUE);
	}

	public function index(){
		$uri1 = $this->uri->segment(1);
		if (empty($uri1)) {
			if ($this->session->userdata('my_store')) {
	  			$this->session->set_userdata('my_store', '');
				$this->session->unset_userdata('my_store');
  			}
		}
  		$this->designs();
  	}

	public function products(){

		$data['template'] = 'store/products';
  		$this->load->view('templates/store_template', $data);
  	}

  	public function product(){
		$data['template'] = 'store/product';
  		$this->load->view('templates/store_template', $data);
  	}

  	public function design_your_own($design_slug=""){

  		 if ($this->session->userdata('design_array')) {
	  		$old_designs = $this->session->userdata('design_array');
			if (count($this->cart->contents())>0)
			{
				foreach ($this->cart->contents() as $item)
				{
                    if (!element($item['rowid'], $old_designs))
                    {
                        unset($old_designs[$item['rowid']]);
                    }
				}
				$this->session->set_userdata('design_array', $old_designs);
			}
		  }
		$col_html = '';
		$product_arr = array();
  		$data['product_id'] = 0;
  		$design_category=$this->store_model->get_row('design_category');
  		if ($_POST) {
  			$prod_color = array('color_id' => $this->input->post('color_id'), 'product_id' => $this->input->post('product_id') );
  			$this->session->set_userdata('color_info', $prod_color);
  			$data['products']=$this->store_model->get_row('products',array('id'=>$this->input->post('product_id') ,'product_status'=>1 ,'is_customized'=>0 ,'admin_custom'=>0));
  			$data['color']=$this->store_model->get_row('product_colors',array('id'=>$this->input->post('color_id')));
  			$data['designs']=$this->store_model->get_result('design',array('status'=>1));
  			$data['product_id'] = $this->input->post('product_id');
  			// $this->session->set_userdata('color_info', array('product_id' => $this->input->post('product_id'), 'color_id' => $this->input->post('color_id')));

  			$data['is_single'] = TRUE;
  		}else{
  			if (!empty($design_slug)){
			$data['designs1']=$this->store_model->get_result('design',array('status'=>1, 'slug'=>$design_slug));
			$data['designs']=$this->store_model->get_design_ajax($design_category->id);
			//$data['designs']=$this->store_model->get_result_desings($design_slug);
			}else{
			$data['designs1']=FALSE;
			//$data['designs']=$this->store_model->get_result('design',array('status'=>1));
			$data['designs']=$this->store_model->get_design_ajax($design_category->id);

			
			}
  			
	  		$data['products']=$this->store_model->get_result('products',array('product_status'=>1,'is_customized'=>0 ,'admin_custom'=>0));
	  		$i = 0;
	  		if ($data['products']) {
		  		foreach ($data['products'] as $value) {
		  			$product_arr[$i] = array(
											 'product_id'	 =>		$value->id,
											 'color_id' 	 =>		$value->default_color,
									   );
		  			$i++;
		  		}
	  		}
	  		$data['is_single'] = FALSE;
  		}

  		if (!$data['designs'] || !$data['products']) {
  			redirect('store');
  		}

  		if (!empty($product_arr)) {
  			$this->session->set_userdata('prod_index', $product_arr);
  			$this->session->set_userdata('color_info', array('product_id' => $product_arr[0]['product_id'], 'color_id' => $product_arr[0]['color_id']));
  			$colors = $this->store_model->get_result('product_colors', array('product_id' => $product_arr[0]['product_id']));
  			foreach ($colors as $col) {
  				$col_html .= '<a href="javascript:void(0);" title="">';
	            $col_html .= '<div onclick="get_col_imgs('.$col->id.', 0)" id="col_'.$col->id.'" class="color_select" style=" float:left; margin-left:5px; background-color: '.$col->color_code.'" title=""></div>';
	          	$col_html .= '</a>';
  			}
  		}
  		
  		$data['col_html'] = $col_html;

  		$data['design_slug'] = $design_slug;

  		$data['template'] = 'store/design_your_own';
  		$this->load->view('templates/store_template', $data);
 
  	}

  	public function ajax_prod_color($index=0){
  		$data = array();
  		$data1 = array();
  		$col_html = '';
  		$product_id = 0;
  		if ($this->session->userdata('prod_index')) {
  			$data = $this->session->userdata('prod_index');
  			$data1 = array('product_id' => $data[$index]['product_id'], 'color_id' => $data[$index]['color_id']);
  			$product_id = $data[$index]['product_id'];
  			$this->session->set_userdata('color_info', $data1);
	  		if (!empty($data1)) {
	  			$colors = $this->store_model->get_result('product_colors', array('product_id' => $product_id));
	  			foreach ($colors as $col) {
	  				$col_html .= '<a href="javascript:void(0);" title="">';
		            $col_html .= '<div onclick="get_col_imgs('.$col->id.', '.$index.')" id="col_'.$col->id.'" class="color_select" style=" float:left; margin-left:5px; background-color: '.$col->color_code.'" title=""></div>';
		          	$col_html .= '</a>';
	  			}
	  		}
	  		$bound_box = $this->store_model->get_row('products', array('id' => $product_id));
            // foreach ($bound_box as $key => $value) {
            // 	$bounding[$key] = $value +
            // }
	  		if ($col_html != '')
	  			echo json_encode(array('status' => 1, 'col' => $col_html, 'bound_box' => json_decode($bound_box->restricted_para)));
	  		else
	  			echo json_encode(array('status' => 0));
  		}else{
  			echo json_encode(array('status' => 0));
  		}
  	}

  	public function ajax_color_set($color_id=0){
  		$data = array();
  		$data1 = array();
  		$col_html = '';
  		$product_id = 0;
  		if ($this->session->userdata('color_info')) {
  			$color = $this->store_model->get_row('product_colors', array('id' => $color_id));
  			if ($color) {
  				$data1 = array('product_id' => $color->product_id, 'color_id' => $color->id);
  				$this->session->set_userdata('color_info', $data1);
  				echo json_encode(array('status' => 1, 'front' => $color->main_image, 'back' => $color->back_image, 'path' => base_url()."assets/uploads/color_img/"));
  			}else
  				echo json_encode(array('status' => 0));
  		}else{
  			echo json_encode(array('status' => 0));
  		}
  	}

  	public function design_info($design_slug=""){
  		if (empty($design_slug))
  			redirect('store/designs');
  		
  		$data['design']=$this->store_model->get_row('design',array('status'=>1, 'slug'=>$design_slug));

  		if (!$data['design']) {
  			redirect('store');
  		}
  		$data['faq']=$this->store_model->get_result('faq');
  		$path=base_url('wear_it').'/'.$design_slug;
  		redirect($path);
		//$data['template'] = 'store/design_info';
  		//$this->load->view('templates/store_template', $data);
  	}

  	// public function ajax_prod_dsn($group=0, $category=0){

			// $products = $this->store_model->get_products_for_editor($group, $category);

			// if (!$products) {
			// 	$products = $this->store_model->get_result('products',array('product_status'=>1));
			// }

			// $designs=$this->store_model->get_result('design',array('status'=>1));
			// $html = '';
			// if ($products) {
			// 	$i=1;
			// 	foreach ($products as $row) {
  	// 				list($width, $height, $type, $attr) = getimagesize(base_url().'assets/uploads/products/'.$row->main_image); 
			// 		$canvas_width=695; //575
			// 		$canvas_height=570;
			// 		$w_f=($canvas_width-$width)/2;
			// 		$h_f=($canvas_height-$height)/2;
 
			//       	$html .= '<div class="fpd-product" title="'.$row->short_name.'" data-thumbnail="'.base_url().'assets/uploads/products/thumbnail/'.$row->main_image.'">
			// 			        	<img src="'.base_url().'assets/uploads/products/'.$row->main_image.'" title="'.$row->short_name.'" data-parameters={"x": '.$w_f.', "y": '.$h_f.', "price": '.$row->price.',"removable": true,"product_id":'.$row->id.'} />
			// 			      	</div>';
   //  				$i++;
   //  			}
  	// 		}

  	// 		$html .= '<div class="fpd-design">';

	  //       if (!empty($designs)){
		 //         foreach ($designs as $row){
		 //         	$arr = '{"x": 215, "y": 200,  "removable": true, "draggable": true, "rotatable":false, "resizable": true, "price": '.$row->price.',"design_id":'.$row->id.' }';
		 //         	$html .= '<img class="designs" id="design'.$row->id.'" src="'.base_url().'assets/uploads/designs/thumbnail/'.$row->design_image.'" title="'.$row->design_title.'" price="'.$row->price.'" data-parameters='.$arr.' />';	         
		 //         }
	  //       }

   //          $html.='</div>';

   //          echo $html;
   //          // echo json_encode(array('resp' => true, 'msg' => '', 'html_data' => $html));
  	// }
  	
	/*public function index($offset = 0){	
		$user_id = "";
		if($this->session->userdata('my_store')){
			$my_store = $this->session->userdata('my_store');
			$user_id = $my_store->user_id;
			$url = 'store_designs/0';
		}
		if( $this->uri->segment(1) == 'store' || $this->uri->segment(1) == '' ){			
			$this->session->unset_userdata('my_store');
			$user_id = "";
			$url = 'index';
		}
		$limit=10;
		$data['designs']=$this->store_model->designs($limit, $offset, $user_id);
		$config = get_theme_pagination();
		$config['base_url'] = base_url().'store/'.$url.'/';
		$config['total_rows'] = $this->store_model->designs(0, 0, $user_id);
		$config['per_page'] = $limit;
		$config['num_links'] = 5;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();
		$data['cat_id'] = '';
		$data['design_category'] = $this->store_model->get_result('design_category');
		$data['template'] = 'store/home';
  		$this->load->view('templates/store_template', $data);
	}*/

	public function store_designs($cat_id = 0, $offset = 0){
		$limit=10;
		if($this->session->userdata('my_store')){
			$my_store = $this->session->userdata('my_store');
			$user_id = $my_store->user_id; 
		}else{
			$user_id = '';
		}
		// echo " <br> storeid = ".$user_id;
		// echo " <br> cat id = ".$cat_id;
		// die();
		$data['designs']=$this->store_model->sort_designs($limit, $offset, $cat_id, $user_id);
		$config= get_theme_pagination();
		$config['base_url'] = base_url().'store/store_designs/'.$cat_id.'/';
		$config['total_rows'] = $this->store_model->sort_designs(0, 0, $cat_id, $user_id);
		$config['per_page'] = $limit;
		$config['uri_segment'] = 4;		
		$config['num_links'] = 5;		
		$this->pagination->initialize($config); 		
		$data['pagination'] = $this->pagination->create_links();
		$data['design_category'] = $this->store_model->get_result('design_category');		
		$data['cat_id'] = $cat_id;

		$data['template'] = 'store/home';
	  	$this->load->view('templates/store_template', $data);
	}
    
	public function sort_by_params($sort = 'newest', $offset = 0){
		$limit=10;
		if($this->session->userdata('my_store')){
			$my_store = $this->session->userdata('my_store');
			$user_id = $my_store->user_id; 
		}else{
			$user_id = '';
		}
		// echo " <br> user_id = ".$user_id;
		// echo " <br> sort = ".$sort;
		// die();
		$data['designs']=$this->store_model->sort_by_params($limit, $offset, $sort, $user_id);
		$config= get_theme_pagination();
		$config['base_url'] = base_url().'store/sort_by_params/'.$sort.'/';
		$config['total_rows'] = $this->store_model->sort_by_params(0, 0, $sort, $user_id);
		$config['per_page'] = $limit;
		$config['uri_segment'] = 4;		
		$config['num_links'] = 5;		
		$this->pagination->initialize($config); 		
		$data['pagination'] = $this->pagination->create_links();
		$data['design_category'] = $this->store_model->get_result('design_category');
		$data['cat_id'] = '';
		$data['template'] = 'store/home';
  		$this->load->view('templates/store_template', $data);			
	}

	// public function Category($cat_id='',$offset = 0){
	// 	$limit=10;
	// 	$data['designs']=$this->store_model->sort_designs($limit, $offset, $cat_id);
	// 	$config= get_theme_pagination();
	// 	$config['base_url'] = base_url().'store/Category/'.$cat_id.'/';
	// 	$config['total_rows'] = $this->store_model->sort_designs(0, 0, $cat_id);
	// 	$config['per_page'] = $limit;
	// 	$config['uri_segment'] = 4;		
	// 	$config['num_links'] = 5;		
	// 	$this->pagination->initialize($config); 		
	// 	$data['pagination'] = $this->pagination->create_links();
	// 	$data['design_category'] = $this->store_model->get_result('design_category');		
	// 	$data['template'] = 'store/home';
	// 	$data['cat_id'] = $cat_id;
 //  		$this->load->view('templates/store_template', $data);			
	// }

	public function signup(){
		if($login = $this->check_login())
				{
					 if(customer_id())
					 	{
					 		redirect('user');
					 	}
					 else {
					 	redirect('storeadmin');
					 }
				}
		$data['latest_design'] = $this->store_model->get_limited_result('design', array('status'=>'1'),3); //new change
		$data['template'] = 'store/signup';
  		$this->load->view('templates/store_template', $data);			
	}

	public function signup_form(){

		if($login = $this->check_login())
				{
					 if(customer_id())
					 	{
					 		redirect('user');
					 	}
					 else {
					 	redirect('storeadmin');
					 }
				}
		$this->form_validation->set_rules('firstname', 'Firstname', 'required');
		$this->form_validation->set_rules('lastname', 'Lastname', 'required');
		$this->form_validation->set_rules('address', 'Address', 'required');
		$this->form_validation->set_rules('city', 'City', 'required');
		$this->form_validation->set_rules('state', 'State', 'required');
		$this->form_validation->set_rules('country', 'Country', 'required');
		$this->form_validation->set_rules('zip_code', 'Zip', 'required|integer |exact_length[5]');
		$this->form_validation->set_rules('email', 'email', 'required|valid_email|is_unique[users.email]');
		$this->form_validation->set_rules('c_email', 'confirm email', 'required|valid_email|matches[email]');
		$this->form_validation->set_rules('password', 'password', 'required|min_length[6]');
		$this->form_validation->set_rules('c_password', 'Confirm password', 'required|matches[password]');
		$this->form_validation->set_rules('securityquestion', 'security question', 'required');
		$this->form_validation->set_rules('answer', 'Answer', 'required');
		$this->form_validation->set_rules('mobile', 'Phone', 'required');
		$this->form_validation->set_message('is_natural_no_zero', 'Please enter valid value');
		$this->form_validation->set_error_delimiters('<div class="error">', '</div>');  
		if ($this->form_validation->run() == TRUE){
			$data = array(
						"firstname" => $this->input->post('firstname'),
						"lastname" => $this->input->post('lastname'),
						"email" => $this->input->post('email'),
						"address" => $this->input->post('address'),
						"city" => $this->input->post('city'),
						"state" =>  $this->input->post('state'),
						"country" => $this->input->post('country'),
						"zip" => $this->input->post('zip_code'),
						'mobile'    => $this->input->post('mobile'),
						"security_question" => $this->input->post('securityquestion'),
						"answer" => $this->input->post('answer'),
						"password" => sha1($this->input->post('password')),
						"user_role" => 3,
						"created" => date('Y-m-d')
					);
			
			
			$uid = $this->store_model->insert('users',$data);
			/*print_r($data);
			die;
*/
			$this->store_model->insert('user_payee_info', array('user_id' => $uid, 'created' => date('Y-m-d')));

			$this->send_registration_email($data['firstname'], $data['lastname'], $data['email'], $this->input->post('password'));

			if($this->session->userdata('design_your_own_id')){
				$this->add_custom_design($uid);				
			}
			$row=array(
				'id'=>$uid,
				'user_role'=>3,
				'username'=>'New User',					
				'firstname'=>$this->input->post('firstname'),
				'lastname'=>$this->input->post('lastname'),
				'email'=>$this->input->post('email'),
				'last_ip'=>'',
				'last_login'=>'',
				'logged_in'=>TRUE,
				'created'=> date('Y-m-d')
				);

			$this->session->set_userdata('customer_info',$row);
			$this->session->set_flashdata('success_msg', 'Welcome <b>'.$row['firstname'].' '.$row['lastname'].',</b> your account has been registered successfully.
				<br>Complete the process by simply uploading your creative designs.<br><br>
				For any help you can contact our support section -<b>Supports -> Need help</b>.<br>

				We will require information for sending your commissions.
				You can add your details in -<b> My Account -> Account Info.</b>');
			redirect('user/add_design');
			// redirect('store/success');
		}
		if ($this->input->post('declare')){
			$data['declare'] = $this->input->post('declare');
		//	print_r($data['declare']);
		}
		else{
			$data['declare'] = '';
		}
		$data['state']=$this->store_model->get_result('state');
		$data['latest_design'] = $this->store_model->get_limited_result('design', array('status'=>'1'),3);
		$data['template'] = 'store/signup_form';
  		$this->load->view('templates/store_template', $data);
	}


	public function add_custom_design($user_id=''){
		$design_your_own_id=$this->session->userdata('design_your_own_id');
		$design_your_own_row=$this->store_model->get_row('design_your_own',array('id'=>$design_your_own_id));

		/*$base64_str=substr($design_your_own_row->base64_str, strpos($design_your_own_row->base64_str, ",")+1);
		$decoded = base64_decode($base64_str);
		$png_url = trim('assets/uploads/test/').'new-design-joe-'.date('Ymdhis').'.png';	
		$result = file_put_contents($png_url, $decoded);*/
		
		$base64_str = substr($design_your_own_row->base64_str, strpos($design_your_own_row->base64_str, ",")+1);		
		$decoded = base64_decode($base64_str);
		$new_design_image_name='new-design-joe'.date('Ymdhis').'.png';
		$png_url = trim('assets/uploads/designs/').$new_design_image_name;	
		$result = file_put_contents($png_url, $decoded);


		if($result) {

			$data=array(
               // 'artist'=>$this->input->post('artist'),
                'artist_id'=>$user_id,
               // 'design_title'=>$this->input->post('design_title'),
               // 'store_id'=>$this->input->post('store_id'),
               // 'description'=>$this->input->post('description'),
                'design_image'=>$new_design_image_name,
               // 'category'=>serialize($this->input->post('category')),
                'created' => date('Y-m-d') 
                );
           $this->store_model->insert('design',$data);

           $this->designs_thumb_file($new_design_image_name);
           
           $this->session->set_flashdata('success_msg', 'Your account has been registred successfully with Submit new Design.');
           //$this->session->set_flashdata('success_msg',"Design has been added successfully.");
              				
			$this->store_model->update('design_your_own', array('user_id'=>$user_id),array('id' => $design_your_own_id));

			$this->session->unset_userdata('design_your_own_id');
			return TRUE;
		}else {
			exit('Error: while creating new desing.');
		}
	}

	public function designs_thumb_file($file){

        $path='./assets/uploads/designs';  
         if (!is_writable($path.'/')) {
            if (!chmod($path.'/', 0777)) {
                echo "Cannot change the mode of file ($0777)";
                exit;
            }
        }
        $config1['image_library'] = 'gd2';
        $config1['source_image']    = $path.'/'.$file;
        $config1['new_image']   = $path.'/thumbnail/'.$file;           
        $config1['quality'] = '100%';
        $config1['maintain_ratio'] = TRUE;
        $config1['width'] = 295;
        $config1['height']  = 295 ;        
        $this->load->library('image_lib', $config1);        
        if ( ! $this->image_lib->resize()){
             echo $this->image_lib->display_errors(); 
             exit;
        }
        $this->image_lib->clear();
    }

	public function success(){
		if (!$this->session->flashdata('success_msg')){
			$this->session->set_flashdata('success_msg', 'Registration Successfull');
			redirect('store/success');
		}
		else{
			$data['template'] = 'store/success';
	  		$this->load->view('templates/store_template', $data);
		}
	}

	public function create_cust_thumb($file){

		$path='./assets/uploads/custom_prod_img';	
		 if (!is_writable($path.'/')) {
            if (!chmod($path.'/', 0777)) {
                 echo "Cannot change the mode of file ($0777)";
                 exit;
            }
        }

		// create file rezize
		$this->load->library('image_lib');
		$config2['image_library'] = 'gd2';
		$config2['source_image'] = $path.'/'.$file;
		$config2['new_image'] = $path.'/thumbnail/'.$file;
		// $config2['new_image'] = $path.'/'.$file;
		$config2['quality'] = '100%';
		$config2['maintain_ratio'] = FALSE;
		$config2['width'] = 100;
		$config2['height']	= 100;
		$this->image_lib->initialize($config2);

		if ( ! $this->image_lib->resize()){
			 echo $this->image_lib->display_errors(); 
			 exit;
		}

		$this->image_lib->clear();
	}
      
	public function check_store_banner(){
        $this->check_login();
        if ($_FILES['userfile']['name'] != ''){
            return TRUE;
        }else{
            $this->form_validation->set_message('check_store_banner', 'Store Banner is required');
            return FALSE;
        }
    }

	public function open_store(){

		if (!customer_login_in())
			redirect(home_url());

		$this->form_validation->set_message('is_unique', 'Store link you are choosing already exist.');
		$this->form_validation->set_rules('store_name', 'Store Name', 'required');
		$this->form_validation->set_rules('store_description', 'Store Description', 'required');
		$this->form_validation->set_rules('userfile', 'Store Banner', 'callback_check_store_banner');
		$this->form_validation->set_rules('store_link',	'Store Link', 'trim|required|xss_clean|is_unique[stores.store_link]');
		if ($this->form_validation->run() == TRUE){

			$store = array(
						"store_name" => $this->input->post('store_name'),
						'store_link'=>$this->input->post('store_link'),
						"store_description" => $this->input->post('store_description'),
						"user_id" => customer_id(),
						"is_processed" => 1,
						'header_color'=>$this->input->post('header_color'),
						'font_color'=>$this->input->post('font_color'),
						"created" => date('Y-m-d')
					);
			if($_FILES['userfile']['name']!=''){
				$do_upload = $this->do_upload();
				if($do_upload['status']==FALSE){
					$this->session->set_flashdata('image_error'.$do_upload['error']);
					redirect('store/open_store/');
				}else{
					$store['store_banner'] = $do_upload['upload_data']['file_name'];
				}
			}
			$store_id = $this->store_model->insert('stores',$store);
			$this->session->set_userdata('new_store',$store_id);
			$user = customer_info();
			$this->send_store_open_email($user['firstname'], $user['lastname'], $user['email']);
			$this->session->set_flashdata('success_msg', 'Store Creation Request Received Successfully and sent for approval. <br>It will approve soon and notification mail will be send to your email id.');
			redirect('store/store_success');
			}
			else{
				 $data['stores'] = $this->store_model->store_home_dashboard();
        //print_r($data['stores']);
        //die;
			$data['template'] = 'store/open_store';
	  		$this->load->view('templates/user_template', $data);
		}
	}
	public function destroy_sess()
	{
		if ($this->session->userdata('new_store')) {
			$this->session->set_userdata('new_store','');
	 		$this->session->unset_userdata('new_store');
		}
		redirect('store/open_store');
	}

	public function check_img_size(){

       if ($_FILES['designfile']['tmp_name'] == '') {
           $this->form_validation->set_message('check_img_size', 'Select an image design to upload.');
           return FALSE;
       }

       $image = getimagesize($_FILES['designfile']['tmp_name']);

       if ($image[0] < 600 || $image[0] < 600) {
           $this->form_validation->set_message('check_img_size', 'Oops! Your design image needs to be atleast 600 x 600 pixels.
               Otherwise its too small to print on our products.');
           return FALSE;
       }
       else{
           return TRUE;
       }
    }

	public function add_more_designs(){
       
	   $this->form_validation->set_rules('artist', 'Artist', 'required');
       $this->form_validation->set_rules('design_title', 'Design title', 'required');
       $this->form_validation->set_rules('description', 'Description', 'required');
       $this->form_validation->set_rules('designfile', 'Design File', 'callback_check_img_size');
       if ($this->session->userdata('new_store'))
	        $store_id = $this->session->userdata('new_store');
	   else{
	    	$this->session->set_flashdata('error_msg','Store details are missing.');
	    	redirect('store/open_store');
	   }
        if ($this->form_validation->run() == TRUE){
       		//print_r($_POST);
		    // print_r($_FILES);
		    // die();

	        if (isset($_POST["add_more"])) {
	        	$data=array(
	                'artist'=>$this->input->post('artist'),
	                'artist_id'=>customer_id(),
	                'design_title'=>$this->input->post('design_title'),
	                'slug'=>$this->input->post('design_slug'),
	                'description'=>$this->input->post('description'),
	                'category'=>serialize($this->input->post('category')),
	                'created' => date('Y-m-d') 
	            	);
	             
	               if($_FILES['designfile']['name']!=''){
		                $config['upload_path'] = './assets/uploads/designs';
		                $config['allowed_types'] = 'gif|jpg|png';
		                $config['max_size'] = '99999999';
		                $this->load->library('upload', $config);

	                    if ( ! $this->upload->do_upload('designfile')){
	                      $this->session->set_flashdata('error_msg', $do_upload['error']);                      
	                      redirect(current_url());
	                      	//redirect('superadmin/add_product/');
	                    }else{
	                        // echo " <br> Uploded";
	                        $upload_data = $this->upload->data();
	                        $data['design_image'] = $upload_data['file_name'];
	                        $this->designs_thumb_file($data['design_image']);
	                    }
	               }else{
	                	$this->session->set_flashdata('error_msg', 'Please select an image to upload');
	                	redirect(current_url());
	               }

	               $design_id = $this->store_model->insert('design',$data);

		           $this->store_model->insert('design_to_multistore',array('design_id' => $design_id, 'store_id' => $store_id));

		           $data['success_msg'] = 'Design Added Successfully....';

		           $count = $this->input->post('design_count');

		           $count++;

		           $data['design_count'] = $count;

	        }elseif (isset($_POST["save"])) {
	        	$data=array(
	                'artist'=>$this->input->post('artist'),
	                'artist_id'=>customer_id(),
	                'design_title'=>$this->input->post('design_title'),
	                'slug'=>$this->input->post('design_slug'),
	                'description'=>$this->input->post('description'),
	                'category'=>serialize($this->input->post('category')),
	                'created' => date('Y-m-d') 
	                );

	               if($_FILES['designfile']['name']!=''){
		                $config['upload_path'] = './assets/uploads/designs';
		                $config['allowed_types'] = 'gif|jpg|png';
		                $config['max_size'] = '99999999';
		                $this->load->library('upload', $config);
	                    if ( ! $this->upload->do_upload('designfile')){
	                      $this->session->set_flashdata('error_msg', $do_upload['error']);                      
	                      redirect(current_url());
	                      //redirect('superadmin/add_product/');
	                    }else{
	                        // echo " <br> Uploded";
	                        $upload_data = $this->upload->data();   
	                        $data['design_image'] = $upload_data['file_name'];
	                        $this->designs_thumb_file($data['design_image']);
	                    }
	               }else{
		                $this->session->set_flashdata('error_msg', 'Please select an image to upload...');
		                redirect(current_url());
	               }

		           $design_id = $this->store_model->insert('design',$data);

		           $this->store_model->insert('design_to_multistore',array('design_id' => $design_id, 'store_id' => $store_id));
		            
		           $this->store_model->update('stores', array('is_processed' => 1), array('id' => $store_id));
				   
				   $user = $this->store_model->get_row('users', array('id' => customer_id()));

				   $this->send_store_open_email($user->firstname, $user->lastname, $user->email);

				   $this->session->set_userdata('new_store','');

				   $this->session->unset_userdata('new_store');

				   redirect('store/store_success');
	        }
	    }

	    if (!isset($data['design_count']))
	    	$data['design_count'] = 0;

	    $data['category']= $this->store_model->get_result('design_category');
		$data['template'] = 'store/add_designs';
  		$this->load->view('templates/store_template', $data);
    }

	public function store_success(){
		if (!$this->session->flashdata('success_msg')){
			$this->session->set_flashdata('success_msg', 'Store Creation Request Recieved Successfully, And sent for approval.');
			redirect('store/store_success');
		}
		else{
			$data['template'] = 'store/store_success';
	  		$this->load->view('templates/store_template', $data);
		}
	}

	public function do_upload(){
		$this->check_login(); 	
		$config['upload_path'] = './assets/uploads/store';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size']	= '10000';
		$this->load->library('upload', $config);
		if ( ! $this->upload->do_upload()){
			return array('status'=> FALSE,'error' => $this->upload->display_errors());			
		}else{
			return array('status'=> TRUE,'upload_data' => $this->upload->data());			
		}
	}
	// private function check_login(){
	// 	if(flyshopadmin_login_in()===FALSE)
	// 		redirect('admin/login');
	// }
	private function check_login(){
		return customer_login_in();
	}

	private function is_admin_login(){
		return storeadmin_login_in();
	}

	public function logout(){
	 	$this->session->set_userdata('customer_info','');
	 	$this->session->unset_userdata('customer_info');
	 	$this->session->set_flashdata('success_msg', "logout successfully");
	 	redirect('store/login');
	 }

    
	public function login(){
		//echo sha1('admin');
		if ($this->is_admin_login()){
			redirect('storeadmin');	
		}

		if ($this->check_login()){
			redirect(home_url());	
		}
		$this->form_validation->set_rules('username', 'Username', 'required');
		$this->form_validation->set_rules('password', 'Password', 'required');
		$this->form_validation->set_error_delimiters('<div class="error-alert">', '</div>');		
		if ($this->form_validation->run() == TRUE){
			// print_r($_POST);
			// die();
			$this->load->model('Login_model');				
			$status=$this->Login_model->login($this->input->post('username'),$this->input->post('password'),3);	
			if($status['status'] === TRUE){
				if ($status['is_storeadmin'] == 1)
					redirect('storeadmin');
				else
					redirect('user/dashboard');
				// redirect(home_url());
			}else{
				$this->session->set_flashdata('error_msg', $status['error_msg']);
				redirect('store/login','refresh');
			}
		}
		$data['template'] = 'store/login';
  		$this->load->view('templates/store_template', $data);
	}

	function fblogin(){	

		// $base_url=$this->config->item('base_url'); //Read the baseurl from the config.php file
		//get the Facebook appId and app secret from facebook.php which located in config directory for the creating the object for Facebook class
    	$facebook = new Facebook(array(
		'appId'		=>  $this->config->item('appID'), 
		'secret'	=> 	$this->config->item('appSecret'),
		// 'sharedSession' => true,
		'cookie' => true 
		));	
		// echo $this->config->item('appID'); die();
		$user = $facebook->getUser(); // Get the facebook user id 
		 print_r($facebook);
		 die();
		// die();
		if($user){			
			try{
				$user_profile = $facebook->api('/me');  //Get the facebook user profile data							
				$params = array('next' => base_url().'store/logout');
				$ses_user	=	array('User'=>$user_profile,
				   'logout' =>$facebook->getLogoutUrl($params)   //generating the logout url for facebook 
				);
		        //var_dump($this->session->set_userdata($ses_user));
				 // redirect('user/fb_user_details/');
					 // print_r($user_profile); die();
				if(!empty($user_profile)){
					// echo "ssss"; die();
				 $this->fb_user_details($user_profile);
				}else  redirect(home_url());
				// header('Location: '.$base_url);
			}catch(FacebookApiException $e){
				$e_type = $e->getType();
				// echo $e_type."<br>";
				echo $e; die();
				error_log($e);
				$user = NULL;
			}		
		}else

			//redirect('store/signup');
		// $this->load->view('main');

	die;}

	// public function test_fb(){
	// 	//echo "here"; die();
	// 	$de = array(
	// 		'first_name' => '',
	// 		'last_name' => '',
	// 		'email' => ''
	// 		);
	// 	// $status=$this->user_model->check_email('wsmsheikh17@yahoo.com');
	// 	// $login_details = $this->user_model->get_user_details('wsmsheikh17@yahoo.com');
	// 	// var_dump($login_details['status']);
	// 	$this->fb_user_details($de);
	// }

	// public function template_for_resgistration($fname, $lname, $email, $password){
	// 	$message = '';
	// 	$message .= '<html>
	// 					<body>
	// 					<h3>Hello '.$fname." ".$lname.',</h3><h4>Your Account has been successfully created. You can login with the following credentials<br> Email : '.$email.'<br> Password : '.$password.' </h4> <br><br>';
	// 	$message .= '<h4> Login URL '.base_url().'store/login <br><br></h4>';
		
	// 	$message .=	'</table></body></html>';

	// 	return $message;
	// }

	public function template_for_resgistration($fname, $lname, $email, $password=""){
		$data['fname'] = $fname;
		$data['lname'] = $lname;
		$data['email'] = $email;
		$data['password'] = $password;
		$data['template'] = 'email/email_registration';
        $message = $this->load->view('templates/email_template', $data, TRUE);
		return $message;
	}

	public function send_registration_email($fname, $lname, $email, $password=''){
		$this->load->library('smtp_lib/smtp_email');
		$subject = 'Shirtscore User';	// Subject for email
		$from = array('no-reply@shirtscore.com' =>'Shirtscore.com');	// From email in array form
		$to = array(
			 $email,
		);
		$html = $this->template_for_resgistration($fname, $lname, $email, $password);
		$is_fail = $this->smtp_email->sendEmail($from, $to, $subject, $html);
		if($is_fail){
		// echo "ERROR :";
		}
	}

	// public function template_for_store_open($fname, $lname, $email){
	// 	$message = '';
	// 	$message .= '<html>
	// 					<body>
	// 					<h3>Hello '.$fname." ".$lname.',</h3><h4>Your store creation request has been recieved successfully and pending for aproval. After aproval You can access your store.<br></h4> <br><br>Email : '.$email.'<br> Password : password remains same as before </h4> <br><br>';
		
	// 	$message .= '<h4> Login URL '.base_url().'store/login <br><br></h4>';
	// 	$message .= '<h4> Thank you <br><br> Shirtscore.com</h4>';
	// 	$message .=	'</body></html>';

	// 	return $message;
	// }

    public function template_for_store_open($fname, $lname, $email){
	  $data = array(
	                 'fname'=>$fname,
	                 'lname'=>$lname,
	                 'email'=>$email,
	               );
	  $data['template'] = 'email/store_open_registration';
	  $message = $this->load->view('templates/email_template',$data,TRUE);
	  return $message;
	}

	public function send_store_open_email($fname, $lname, $email){
	
		$this->load->library('smtp_lib/smtp_email');
		$subject = 'Shirtscore User';	// Subject for email
		$from = array('no-reply@shirtscore.com' =>'Shirtscore.com');	// From email in array form
		$to = array(
			 $email,
		);
		$html = $this->template_for_store_open($fname, $lname, $email);
		$is_fail = $this->smtp_email->sendEmail($from, $to, $subject, $html);
	}


    
	public function fb_user_details($details){
		// print_r($details); die();
		if(!empty($details)){
			$this->load->model('user_model');
			$status=$this->user_model->check_email($details['email']);
			if($status === TRUE){
				$login_details = $this->user_model->get_user_details($details['email']);
				if($login_details['status']){
					if ($login_details['is_storeadmin'] == 1)
						redirect('storeadmin');
					else
						redirect(home_url());				
				}else{
					$this->session->set_flashdata('error_msg', $status['error_msg']);
					redirect('store/login');	
				}
			}else{
			$user_fname = $details['first_name'];
			$user_lname = $details['last_name'];
			$user_email = $details['email'];
			$password   = rand(100000,1000000);

			$data=array(
					'firstname' => ucfirst($user_fname),
					'lastname'  => ucfirst($user_lname),
					'email'     => $user_email,
					'password'  => sha1($password),
					'user_role' => 3,
					'outh_provider' => 'facebook',
					'activated' =>1,
					'created' => date('Y-m-d h:i:s')
				 	);	
			
			$uid = $this->store_model->insert('users',$data);
			$this->store_model->insert('user_payee_info', array('user_id' => $uid, 'created' => date('Y-m-d')));
			$this->send_registration_email($user_fname, $user_lname, $user_email, $password);
			$this->load->model('login_model');
			$status=$this->login_model->login($user_email,$password,3);	
			if($status['status']){
				if ($login_details['is_storeadmin'] == 1)
						redirect('storeadmin');
					else
						redirect(home_url());					
			}else{
				$this->session->set_flashdata('error_msg', $status['error_msg']);
				redirect('store/login');
			}
		  }	
		}
		// print_r($details);
		// //print_r($this->session->userdata('User'));
		// echo "<br>";
		// echo "<a href='".base_url()."user/fb_logout'>logout</a>";
	}

	public function faq()
    {
        $data['faq']=$this->store_model->get_result('faq');
        if (!$data['faq'])
        	redirect('store');
        $data['template'] = 'store/faq';
        $this->load->view('templates/store_template', $data);   
    }

    public function pages($slug = "")
    {
        $data['page']=$this->store_model->get_row('pages', array('slug' => $slug, 'status' => 1));
        if (!$data['page'])
        	redirect('store');

        $data['template'] = 'store/pages';
        $this->load->view('templates/store_template', $data);   
    }


	public function get_default_color($product_id)
    {
        $data['faq']=$this->store_model->get_default_color();
        $data['template'] = 'store/faq';
        $this->load->view('templates/store_template', $data);   
    }

	public function update_to_cart(){
		$data=array();
		$data1=array();
		$data2=array();
		if ($this->session->userdata('design_array'))
			$data1 = $this->session->userdata('design_array');
		
		for ($i=0; $i < count($_POST['rowid']); $i++) {
			if($_POST['qty'][$i]){
				$data[] = array(
	               'rowid' => $_POST['rowid'][$i],
	               'qty'   => $_POST['qty'][$i]
	            );
	            $cart_details = $this->cart->product_options($_POST['rowid'][$i]);
	            
	            $id = $cart_details['Product_id'];
	            $rowid = $_POST['rowid'][$i];
            	if (isset($data1[$rowid])) {
	            	$prod_designs = array();
	            	$prods = array();

	            	foreach ($data1[$rowid] as $p_id => $d_data) {
	            		foreach ($d_data as $d_id => $data2) {

		            		$data2['qty'] = $_POST['qty'][$i];

		            		$total = ($data2['design_qty'] * $data2['design_price'] * $_POST['qty'][$i]);

		            		$data2['total'] = number_format($total,2);

		            		$prod_designs[$d_id] = $data2;
	            		}
	            		$prods[$p_id] = $prod_designs;
	            	}

	            	$data1[$rowid] = $prods;
            	}
			}			
		}
		// print_r($data1);
		// die();
		if ($this->session->userdata('design_array')) {
			
			$this->session->set_userdata('design_array', '');

			$this->session->unset_userdata('design_array');

			$this->session->set_userdata('design_array', $data1);
		}

		$this->cart->update($data);

		if ($this->session->userdata('discount'))
			$this->update_discount();
		else
			redirect('store/cart');
	}


	public function remove_to_cart($rowid=''){
		$data2=array();
		if ($this->session->userdata('design_array'))
			$data2 = $this->session->userdata('design_array');

		if(!empty($rowid)){
			$data=array(
		               'rowid' => $rowid,
		               'qty'   => '0'
		            ) ;

			$cart_details = $this->cart->product_options($rowid);

		    $id = $cart_details['Product_id'];

	    	if (isset($data2[$rowid])) {
			 	unset($data2[$rowid]);
			 	$this->session->set_userdata('design_array', '');
			 	$this->session->unset_userdata('design_array');
			 	$this->session->set_userdata('design_array', $data2);
			 	$cus_prod = is_customized($id);
			 	if ($cus_prod) {
			 		$this->store_model->delete('products', array('id' => $id));
			 		//$this->store_model->delete('custom_product', array('custom_product' => $id));
			 	}
	    	}

			$this->cart->update($data);
		}
		
		if ($this->session->userdata('discount'))
			$this->update_discount();
		else
			redirect('store/cart');
	}

	public function empty_cart(){

		$this->cart->destroy();
		
		if ($this->session->userdata('discount')) {
			$discount = $this->session->userdata('discount');
			$coupon = $this->store_model->get_row('coupons', array('code' => $discount['code']));
			$new_count = $coupon->num_uses;
			$new_count--;
			$this->store_model->update('coupons', array('num_uses' => $new_count), array('code' => $discount['code']));
			$this->session->set_userdata('discount','');
	        $this->session->unset_userdata('discount');
		}

		if ($this->session->userdata('design_info')) {
			$this->session->set_userdata('design_info','');
	        $this->session->unset_userdata('design_info');
		}

		if ($this->session->userdata('products_designs')) {
			$this->session->set_userdata('products_designs','');
	        $this->session->unset_userdata('products_designs');
		}

		if ($this->session->userdata('design_array')) {
			$data2 = $this->session->userdata('design_array');
			$this->session->set_userdata('design_array','');
	        $this->session->unset_userdata('design_array');
		 	foreach ($data2 as $pid => $pdata) {
			 	$cus_prod = is_customized($pid);

			 	if ($cus_prod) {
			 		$this->store_model->delete('products', array('id' => $pid));
			 		$this->store_model->delete('custom_product', array('custom_product' => $pid));
			 	}
		 	}
		}

		// $path='./assets/uploads/test/';
		// if(!empty($this->cart->contents())){
		// 	@unlink($path.$cus_prod->main_image);
		// 	@unlink($path.$cus_prod->back_image);
		// 	@unlink($path.'/thumbnail/'.$cus_prod->main_image);
		// 	@unlink($path.'/thumbnail/'.$cus_prod->back_image);
		// 	@unlink($path.'/temp/'.$cus_prod->main_image);
		// 	@unlink($path.'/temp/'.$cus_prod->back_image);
		// 	@unlink($path.'test.png');
		// }

		redirect(home_url(), 'refresh');
	}

	public function cart()
	{

		//$this->output->enable_profiler(TRUE);
		// print_r($this->cart->contents());
		// print_r($this->session->userdata('design_array'));
		// die();
	    $data['template'] = 'store/cart';
	    $this->load->view('templates/store_template', $data);      
	}

	public function check_array()
	{
		$item_array = array();
		$products_designs = $this->session->userdata('design_array');
		foreach ($products_designs as $row_id => $prod_ids) {
			foreach ($prod_ids as $prod_id => $designs) {
				foreach ($designs as $d_id => $record) {
					if (isset($item_array[$prod_id][$d_id])) {
						$item_array[$prod_id][$d_id]['qty'] += $record['qty'];
						$item_array[$prod_id][$d_id]['total'] += $record['total'];
					} else {
						$item_array[$prod_id][$d_id] = $record;
					}
				}
			}
		}
		print_r($item_array);
		die();      
	}

	public function check_array2()
	{
		$final_cart = $this->cart->contents();
		foreach ($final_cart as $value) {
				$options = $value['options'];
				print_r($options);
				// echo "Used : ".$options['product_used'];
			}
		die();      
	}

	public function checkout(){

		if ($this->cart->total_items() == 0){
			$this->session->set_flashdata('error_msg', 'Cart is empty');
			redirect('store/cart');
		}

		$is_gift = 0;

		if ($this->input->post('is_gift') != '')
			$is_gift = 1;

			$this->form_validation->set_rules('billing_name', 'Billing Name', 'required');
			$this->form_validation->set_rules('billing_last_name', 'Billing Last Name', 'required');
			$this->form_validation->set_rules('billing_address', 'Billing Address', 'required');
			$this->form_validation->set_rules('city', 'City', 'required');
			$this->form_validation->set_rules('country', 'Country', 'required');
			$this->form_validation->set_rules('state', 'State', 'required');
			$this->form_validation->set_rules('zip_code', 'Zip Code', 'required|integer |exact_length[5]');
			$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
			$this->form_validation->set_rules('confirm_email', 'Email Confirmation', 'required|valid_email|matches[email]');
			$this->form_validation->set_rules('mobile', 'Phone', 'required');
			if(!empty($_POST['ship_to_billing']))
			{
				$this->form_validation->set_rules('recipient_name', 'Recipient Name', 'required');
				$this->form_validation->set_rules('recipient_last_name', 'Recipient Last Name', 'required');
				$this->form_validation->set_rules('delivery_address', 'Delivery Address', 'required');
				$this->form_validation->set_rules('shipping_city2', 'City', 'required');
				
				$this->form_validation->set_rules('shipping_state2', 'State', 'required');
				$this->form_validation->set_rules('shipping_zip2', 'Zip Code', 'required|integer|exact_length[5]');
			}
			/*if(!empty($_POST['say_something']))
			{
				$this->form_validation->set_rules('say_something', 'Your Note', 'required');
			}*/
			$this->form_validation->set_error_delimiters('<div class="error">', '</div>');		
			if ($this->form_validation->run() === TRUE){
				
				$say_something='';
				$shipping_info=0;
				if(!empty($_POST['say_something']))
				{

					$say_something=$this->input->post('say_something');
				}
				
				if(!empty($_POST['ship_to_billing']))
					{
						$shipping_info=1;
						$recipient_name=$this->input->post('recipient_name').' '.$this->input->post('recipient_last_name');
						$delivery_address=$this->input->post('delivery_address');
						$shipping_zip2=$this->input->post('shipping_zip2');
						$shipping_city2=$this->input->post('shipping_city2');
						$shipping_state2=$this->input->post('shipping_state2');
						$biling_adrs_same_2_adrs='Yes';
					}
				else
				{
					$recipient_name=$this->input->post('billing_name').' '.$this->input->post('billing_last_name');
					$delivery_address=$this->input->post('billing_address');
					$shipping_zip2=$this->input->post('zip_code');
					$shipping_city2=$this->input->post('city');
					$shipping_state2=$this->input->post('state');
					$biling_adrs_same_2_adrs='No';
				}
				$u_id=0;
				if($login = $this->check_login())
				{
					 if(customer_id())
					 	{
					 		$u_id = customer_id();
					 	}
					 else {
					 	$u_id = storeadmin_id();
					 }
				}
				

		    	$cart_user_info=array(
		    		'shipping_info'=>$shipping_info,
		    		'recipient_name'	=>$recipient_name,
		    		'billing_name'		=>$this->input->post('billing_name').' '.$this->input->post('billing_last_name'),
		    		'email'				=>$this->input->post('email'),
		    		'delivery_address'	=>$delivery_address,
		    		'billing_address'	=>$this->input->post('billing_address'),
		    		'biling_adrs_same_2_adrs'	=> $biling_adrs_same_2_adrs,
		    		'city'				=>$this->input->post('city'),
		    		'country'			=>$this->input->post('country'),
		    		'state'				=>$this->input->post('state'),
		    		'zip_code'			=>$this->input->post('zip_code'),
		    		'shipping_city2'	=>$shipping_city2,
		    		'shipping_state2'	=>$shipping_state2,
		    		'shipping_zip2'		=>$shipping_zip2,
		    		'phone'				=>$this->input->post('mobile'),
		    		'is_gift'			=>$is_gift,
		    		'say_something'		=>$say_something,
		    		'shipping_method'	=>$this->input->post('shipping_days'),
		    		'user_id'		=>    $u_id
		    		);
		    		$this->session->set_userdata('cart_user_info',$cart_user_info);
		    		//print_r($cart_user_info);
		    		//die;
					redirect('store/cart_payment');
			}
		
		// redirect('store/cart');
			
  	if($login = $this->check_login())
				{
					 if(customer_id())
					 	{
					 		$uid = customer_id();
					 	}
					 else {
					 	$uid = storeadmin_id();
					 }
					 $data['user_info'] = $this->store_model->get_row('users', array('id' => $uid)); 
				}
		$data['state']=$this->store_model->get_result('state');
		//print_r($data['state']);
      $data['template'] = 'store/shipping_info';
	  $this->load->view('templates/store_template', $data);    
	}
	public function cart_payment()
	{
		  $amounts = $this->session->userdata('grand_total');
		  $amounts['shipping_handling'] = 4.95;
		  $amounts['total_amount'] = ($this->cart->total() - $amounts['discount']) + 4.95;
		  $this->session->set_userdata('grand_total','');
        $this->session->unset_userdata('grand_total');
        $this->session->set_userdata('grand_total',$amounts);

		$this->output->enable_profiler(TRUE);
	    if($this->cart->total_items() == 0)
	    {
			$this->session->set_flashdata('error_msg', 'Cart is empty.');
			redirect('store/cart');
		}
	   // print_r($data['product']);
	   // die();
	   $data['template'] = 'store/cart_payment';
	   $this->load->view('templates/store_template', $data);
	}


	public function stripe_form(){
		$userdatasession=$this->session->userdata('cart_user_info');
		//print_r($userdatasession);
		//die;
		$stripeData = array(
				'name'			=> $userdatasession['recipient_name'],
				'address'		=> $userdatasession['billing_address'],
				'city'			=> $userdatasession['city'],
				'state'			=> $userdatasession['state'],
				'zip'			=> $userdatasession['zip_code'],
				'country'		=> $userdatasession['country'],
				'stripeToken'	=> $this->input->post('stripeToken')
			);
		if ($this->session->userdata('cart_user_info')) {
			$cart_user_info = $this->session->userdata('cart_user_info');
			if ($this->input->post('is_same_address') == 1) {
				$cart_user_info['recipient_name'] = $this->input->post('recipient_name');
				$cart_user_info['delivery_address'] = $this->input->post('delivery_address');
				$cart_user_info['biling_adrs_same_2_adrs'] = 'No';
				$this->session->set_userdata('cart_user_info',$cart_user_info);
			}
		}
		$this->session->set_userdata('stripeData', $stripeData);
		$this->session->set_userdata('paymentMethod', 'stripe');
		redirect('store/confirm_order');
	}
	
	public function payment(){
		/*
		$userdatasession=$this->session->userdata('cart_user_info');
		//print_r($userdatasession);
		//die;
		$stripeData = array(
				'name'			=> $userdatasession['recipient_name'],
				'address'		=> $userdatasession['billing_address'],
				'city'			=> $userdatasession['city'],
				'state'			=> $userdatasession['state'],
				'zip'			=> $userdatasession['zip_code'],
				'country'		=> $userdatasession['country'],
				'stripeToken'	=> $this->input->post('stripeToken')
			);
		if ($this->session->userdata('cart_user_info')) {
			$cart_user_info = $this->session->userdata('cart_user_info');
			if ($this->input->post('is_same_address') == 1) {
				$cart_user_info['recipient_name'] = $this->input->post('recipient_name');
				$cart_user_info['delivery_address'] = $this->input->post('delivery_address');
				$cart_user_info['biling_adrs_same_2_adrs'] = 'No';
				$this->session->set_userdata('cart_user_info',$cart_user_info);
			}
		}
		$this->session->set_userdata('stripeData', $stripeData);
		$this->session->set_userdata('paymentMethod', 'stripe');
		redirect('store/confirm_order');
		*/
		redirect('store/confirm_order');
	}

	public function confirm_order(){

		//$this->output->enable_profiler(TRUE);
		// print_r($this->cart->contents());
		// print_r($this->session->userdata('design_array'));
		// die();
		$data['template'] = 'store/confirm_order';
	  	$this->load->view('templates/store_template', $data);
	}

	public function stripe_pay(){
		$amounts = $this->session->userdata('grand_total');
		$stripeData = $this->session->userdata('stripeData');
		$amt = number_format($amounts['total_amount'] ,2);
		$token = $stripeData['stripeToken'];
		$desc = 'This is test.';
		$response = $this->store_model->stripe_update($amt,$token,$desc);
		if($response){
			redirect('store/payment_status/'.$response);
		}
		else{
			redirect('store/payment_status/');
		}
	}

	public function paypal_pay(){
		$this->session->set_userdata('paymentMethod', 'paypal');
		redirect('store/confirm_order');
	}

	public function paypal_success(){

		//$this->output->enable_profiler(TRUE);
		$response = $this->store_model->paypal_success();
		redirect('store/payment_status/'.$response);
	}


	public function payment_status($order_id = ''){
		//$this->output->enable_profiler(TRUE);
		$data['order_id'] = $order_id;
		if($order_id != ''){
			$this->cart->destroy();
		}else{
			$this->session->set_flashdata('error_msg', 'Payment not completed...!!!');
			redirect('store/confirm_order');
		}
		// $data['template'] = 'store/payment_status';
		$data['template'] = 'store/cart_processed';
	  	$this->load->view('templates/store_template', $data);
	}


	// public function order_tracking($order_id = ''){
	// 	if ($order_id != ''){
	// 		$order_status = $this->store_model->order_tracking($order_id);
	// 		if ($order_status)
	// 			$data['order_status'] = $order_status;
	// 		else
	// 			$data['error_msg'] = 'Invalid Order Id';
	// 	}else{
	// 		$data['error_msg'] = 'Order Id is empty';	
	// 	}
			
	// 		$data['template'] = 'store/order_tracking';
	// 	  	$this->load->view('templates/store_template', $data);
	// }

	public function check_order_id($oid=""){
		// echo $oid;
		$resp = $this->store_model->get_row('orders', array('order_id' => $oid));
		// print_r($resp);
		// die();
		if ($resp)
			return TRUE;
		else{
			$this->form_validation->set_message('check_order_id', 'Order Id is invalild');
			return FALSE;
		}
	}

	public function order_info(){
		$this->form_validation->set_rules('order_id', 'Order Id', 'required|callback_check_order_id');
		if ($this->form_validation->run() === TRUE){
			$order_id = $this->input->post('order_id');
			$order = $this->store_model->get_row('orders', array('order_id' => $order_id));
			// if ($order){
				$oid = $order->id;
				$user_data = $this->store_model->order_user_info($oid);
				$data['order_user_info'] = $user_data;
				$data['order_info'] = $this->store_model->order_info($oid);
				$data['order_id'] = $oid;
				$data['template'] = 'store/order_tracking';
        		$this->load->view('templates/store_template', $data);
			// }
			// else{
			// 	$this->session->set_flashdata('error_msg', 'Invalid Order Id');
			// 	redirect('store/order_info');
			// }
		}else{
			$data['template'] = 'store/order_status';
		  	$this->load->view('templates/store_template', $data);
		}
	}
 
     
	public function order_tracking($order_id=''){
		$oid = 0;
		$order = $this->store_model->get_row('orders', array('order_id' => $order_id));
		if ($order) {
			$oid = $order->id;
			$user_data = $this->store_model->order_user_info($oid);
			$data['order_user_info'] = $user_data;
			$data['order_info'] = $this->store_model->order_info($oid);
			$data['order_id'] = $oid;
		}
		$data['template'] = 'store/order_tracking';
        $this->load->view('templates/store_template', $data);		
	}
    
	public function update_discount()
	{
		$discount = 0;
		
		$order_total = $this->cart->total();

		$discount_arr = $this->session->userdata('discount');

		if ($discount_arr['reduction_type'] == 1)
		{
			$discount = ($order_total * $discount_arr['reduction_amount']) / 100;
		}
		else
		{
			$discount =  $discount_arr['reduction_amount'];
		}

		if ($order_total < $discount) {
			 $this->session->set_userdata('discount','');
        	 $this->session->unset_userdata('discount');
       
			$this->session->set_flashdata('error_msg' , 'Not enough Order Total for this discount');
		}else{

			 $discount_arr = $this->session->userdata('discount');

			 $discount_arr['dis_amount'] = $discount;

			 $this->session->set_userdata('discount','');
        	 $this->session->unset_userdata('discount');
			 $this->session->set_userdata('discount',$discount_arr);
		}
		redirect('store/cart');
	}


	public function ajax_discount_it($code = '')
	{
		$order_total = 0;
		
		$discount = 0;
		
		$error = "";

		if ($code == '')
			$error = "Invalid/Expired Code.";
		else
		{
			$result = $this->store_model->get_discount($code);

			$cart_data = $this->cart->contents();

			if(empty($cart_data))
				$error = "Your Cart is empty.";
			else
			{
				$order_total = $this->cart->total();
				
				if ($result['status'] == 'success') 
				{
					$resp = $result['resp'];

					if ($resp->reduction_type == 1)
					{
						$discount = ($order_total * $resp->reduction_amount) / 100;
					}
					else
					{
						$discount = $resp->reduction_amount;
					}
                     
					if ($order_total < $discount) {
						$arr = array('result' => 'error', 'msg' => 'Not enough Order Total for this discount');
						$arr = json_encode($arr);
				 		echo $arr;
				 		die();
					}

					$array = array(
										'code' => $code, 
										'reduction_type' => $resp->reduction_type, 
										'reduction_amount' => $resp->reduction_amount, 
										'dis_amount' => $discount
									  );

					$this->session->set_userdata('discount',$array);

					$arr = array('result' => 'success', 'amount' => $discount);

					$arr = json_encode($arr);
			 		echo $arr;
			 		die();
				}
				else
					$error = $result['msg'];
			}
		}
        
		if(isset($error))
		{
			$arr = array('result' => 'error', 'msg' => $error);
			$arr = json_encode($arr);
	 		echo $arr;
		}

	}
    
	public function cancel_discount()
	{
		if ($this->session->userdata('discount')) {
			$discount = $this->session->userdata('discount');
			$coupon = $this->store_model->get_row('coupons', array('code' => $discount['code']));
			$new_count = $coupon->num_uses;
			$new_count--;
			$this->store_model->update('coupons', array('num_uses' => $new_count), array('code' => $discount['code']));
			$this->session->set_userdata('discount','');
	        $this->session->unset_userdata('discount');
		}
        redirect('store/cart');
	}
// awais bhai

	public function product_view($product_id = '')
	{
	   if ($product_id == '') {
	   		$product_id = $this->store_model->get_default_prod_id();
	   }
       
	   if ($this->session->userdata('current_design')) {
	   		$design_info = array();
			$design_data = $this->session->userdata('current_design');
			$design_price = $this->store_model->get_design_price($design_data['design_id']);
			$design = $this->store_model->get_row('design',array('id' => $design_data['design_id']));
			$design_info[$product_id] = array(
								'design_id' 	=> $design_data['design_id'],
								'product_id' 	=> $design_data['product_id'],
								'qty'			=> 1,
								'design_price'  => number_format($design_price,2),
								'total'			=> $design_price,
								'artist'		=> $design->artist,
								'design_title'  => $design->design_title,
								'desc'			=> $design->description
								);
			$this->session->set_userdata('design_info', $design_info);
			$data['design_info'] = $design_info;
			$data['design_image'] = $design->design_image;
		}else
			redirect('store/designs');

	   $data['product'] = $this->store_model->get_product($product_id);
	   // echo "<br> product Id = ".$product_id;
	   // print_r($data['product']);
	   // die();
	   $data['latest_design'] = $this->store_model->get_limited_result('design', array('status'=>'1'),8); //new change
	   $data['colors'] = $this->store_model->get_prod_col($product_id);
	   $default_col_id = $this->store_model->get_default_color($product_id);
	   // echo "Color id = ". $default_col_id;
	   if ($default_col_id)
	   		$data['col_img'] = $this->store_model->get_col_img($product_id, $default_col_id);
	   $size_id = unserialize($data['product']->size_id);
	   $data['sizes'] = $this->store_model->get_prod_size($size_id);
	   $data['other_products'] = $this->store_model->get_result("products", array('product_status' => 1));
	   // print_r($data['sizes']);
	   // print_r($data['other_products']);

	   // print_r($data); die();
	  
	   $data['template'] = 'store/product_view';
	   $this->load->view('templates/store_template', $data);   
	}

	public function create_product_design($design_id = 0, $product_id = ''){

		if ($product_id == '') {
	   		$product_id = $this->store_model->get_default_prod_id();
	   	}
	   	
	   	if ($this->session->userdata('current_design')) {
	   		$current_design = $this->session->userdata('current_design');
	   		if ($design_id != $current_design['design_id']) {
	   			$current_design['design_id'] = $design_id;
	   			$this->session->set_userdata('current_design', $current_design);
	   		}
	   		$design_id = $current_design['design_id'];
	   		// echo $current_design['product_id']." == ".$product_id;
		   	if ($current_design['product_id'] != $product_id ) {
		   		$path = './assets/uploads/designs/merged/';
		   		@unlink($path.$current_design['design']);
		   	}
	   	}
	   	$design = $this->store_model->get_current_design($design_id);
	   	// echo 'id = '.$design_id;
	   	// echo '<br>'.$design;
	   	// die();
	   	if (!$design)
	   		redirect('store');

		$source_path='./assets/uploads/designs/thumbnail/';	
		$dest_path='./assets/uploads/designs/temp/';	
		// if (!is_writable($source_path.'/')) {
  //           if (!chmod($source_path.'/', 0777)) {
  //                echo "Cannot change the mode of file ($0777)";
  //                exit;
  //           }
  //       }
		// create file rezize
		$this->load->library('image_lib');
		$config2['image_library'] = 'gd2';
		$config2['source_image'] = $source_path.$design;
		$config2['new_image'] = $dest_path.$design;
		// $config2['new_image'] = $path.'/'.$file;
		$config2['quality'] = '100%';
		$config2['maintain_ratio'] = FALSE;
		$config2['width'] = 60;
		$config2['height']	= 60;
		$this->image_lib->initialize($config2);

		if ( ! $this->image_lib->resize()){
			 echo $this->image_lib->display_errors(); 
			 exit;
		}
		
		$this->image_merged($config2['new_image'], $design_id, $product_id);

		// redirect('store/index');
	}

	public function image_merged($item = 0, $design_id = 0, $product_id = '')
	{
		$product = $this->store_model->get_prod_image($product_id);
		$frame='./assets/uploads/products/'.$product;
		// echo '<br>'.$design;
		// echo '<br>'.$product;
		// die();
		// $frame = $product;
		$bg = imagecreatefromstring(file_get_contents($frame));
		$over = imagecreatefromstring(file_get_contents($item));
		$data1 = getimagesize($frame);
		$data2 = getimagesize($item);
		$over_x_w = $data2[0];
		$over_y_h = $data2[1];
		echo"<br>". $bg_x_w = (int) ($data1[0]/2);
		echo"<br>".$bg_x_w = $bg_x_w - ($over_x_w/2);
		echo"<br>".$bg_y_h = (int) ($data1[1]/4);
		echo"<br>".$bg_y_h = $bg_y_h - ($over_y_h/2);

		 //die();
		imagealphablending($bg, true);
		imagesavealpha($bg, true);
		imagecopy($bg, $over, $bg_x_w, $bg_y_h, 0, 0, $over_x_w, $over_y_h);
		// imagecopy($bg, $over, 100, 50, 0, 0, 72, 72);
		// imagecopymerge($bg, $over, 130, 100, 0, 0, 80, 80, 100);
		// $new_image = substr($product, 0, -4);
		$new_image = 'design-prod'.date('Ymdhis');
		imagepng($bg, './assets/uploads/designs/merged/'.$new_image.'.png');
		$design_arr = array(
							'only_name' => $new_image, 
							'design' => $new_image.'.png',
							'design_id' => $design_id, 
							'product_id' => $product_id 
							);

		$this->session->set_userdata('current_design',$design_arr);

		redirect('store/product_view/'.$product_id);

		// imagepng($bg, 'image/calc_final123.png');
	}

	public function ajax_image_merged()
	{
		if (!$this->session->userdata('current_design')) {
			redirect('store');
		}
		$design = $this->session->userdata('current_design');
		// echo json_encode($design);
		// die();
		
		$design_img = $this->store_model->get_current_design($design['design_id']);
		$item = './assets/uploads/designs/temp/'.$design_img;
		$product = $this->store_model->get_prod_image($design['product_id']);
		$frame='./assets/uploads/products/'.$product;
		$x = $_POST['x']; //Design x
        $y = $_POST['y']; //Design y
        $org_x = $_POST['org_x']; //Origin x
        $org_y = $_POST['org_y']; //Origin y

        $bg = imagecreatefromstring(file_get_contents($frame));
        $over = imagecreatefromstring(file_get_contents($item));
        $data1 = getimagesize($frame);
        $data2 = getimagesize($item);
        
        $over_x_w = $data2[0];
        $over_y_h = $data2[1];
        // echo "<br>ORG X = ".$org_x;
        // echo "<br>X = ".$x;
        // echo "<br>ORG Y = ".$org_y;
        // echo "<br>Y = ".$y;
        // die();
        $bg_x_w = $org_x + $x;
        $bg_y_h = $org_y + $y;
       
        imagealphablending($bg, true);
        imagesavealpha($bg, true);
        imagecopy($bg, $over, $bg_x_w, $bg_y_h, 0, 0, $over_x_w, $over_y_h);
       
        $new_image = 'design-prod'.date('Ymdhis');
        // $path = './assets/uploads/designs/merged/'.$new_image.'.png';
        imagepng($bg, './assets/uploads/designs/merged/'.$new_image.'.png');
		$design_arr = array(
							'only_name' => $new_image, 
							'design' => $new_image.'.png',
							'design_id' => $design['design_id'], 
							'product_id' => $design['product_id']
							);

		$this->session->set_userdata('current_design',$design_arr);

		$img = '<img src="'.base_url().'assets/uploads/designs/merged/'.$new_image.'.png">';

		echo $img;

		// imagepng($bg, 'image/calc_final123.png');
	}

	public function ajax_change_image($image_id){
		$data = $this->store_model->get_row('product_images', array('id' => $image_id));
		$response = "<img src='".base_url()."assets/uploads/color_img/".$data->image_name."'>";
		echo $response;
	}

	public function check_link($url){
			$this->session->set_userdata('storeid', '');
			$this->session->unset_userdata('storeid');
			$store_info = $this->store_model->get_row('stores', array('store_link' => $url));
			if(!empty($store_info)){
			if ($store_info->status == 0) {
			$data['error_msg'] = 'This Store is pending for approval and temporarily unavailable....!!!!';
			$this->session->unset_userdata('storeid');
			$data['template'] = 'store/no_store';
			$this->load->view('templates/store_template', $data);
			} 
			elseif ($store_info->is_blocked == 1) {
			$data['error_msg'] = 'This Store is blocked and temporarily unavailable....!!!!';
			$this->session->unset_userdata('storeid');
			$data['template'] = 'store/no_store';
			$this->load->view('templates/store_template', $data);
			}
			else
			{

			$user = $this->store_model->get_row('users', array('id' => $store_info->user_id, 'banned' => 0));
			if ($user){
			$this->session->set_userdata('my_store', $store_info);
			$this->index();
			}else{
			$data['error_msg'] = 'Store is not available for now, Please visit later....!!!!';
			// $this->session->set_flashdata('banned_msg','This Store is not available. Please visit later.');
			$this->session->unset_userdata('storeid');
			   $data['template'] = 'store/no_store';
			   $this->load->view('templates/store_template', $data);
			}
			}
			}else{
			$data['error_msg'] = 'Oopps No Store Found....!!!!<br> Wrong store link...';
			// $this->session->set_flashdata('no_store_msg','No Store found with this store link. Please check the store link.');
			$this->session->unset_userdata('storeid');
			$data['template'] = 'store/no_store';
			$this->load->view('templates/store_template', $data);
			}
			}



// awais bhai


	public function ajax_col_imgs($color_id = '')
	{
		if ($color_id == '')
			$error = "Undefined Color";
		else
		{
			$color_img = $this->store_model->get_row('product_colors', array('id' => $color_id));
			$product = $this->store_model->get_row('products', array('id' => $color_img->product_id));
			if(!$color_img)
				$error = "No views available for this color";
			else
			{
				$html = '';
				$html.='<div class="span6" style="text-align:center;">';
				$html.='<img id="facebook_share" slug="'.$product->slug.'" dname="'.$product->regular_name.'" src="'.base_url().'assets/uploads/color_img/'.$color_img->main_image.'" />';
				$html.=' </div>';
				if(!empty($color_img->back_image)){
					$html.='<div class="span6" style="text-align:center;">';
					$html.='<img src="'.base_url().'assets/uploads/color_img/'.$color_img->back_image.'" />';
					$html.='</div>';
				}
				$arr = array('result' => 'success', 'imgs' => $html);
				$arr = json_encode($arr);
		 		echo $arr;
		 		die();
			}
		}
		if(isset($error))
		{
			$arr = array('result' => 'error', 'msg' => $error);
			$arr = json_encode($arr);
	 		echo $arr;
		}
	}

	public function need_help(){

        $this->form_validation->set_rules('name', 'Name', 'required');
        $this->form_validation->set_rules('email', 'E-mail', 'required|valid_email');
        $this->form_validation->set_rules('subject', 'Subject', 'required');
        $this->form_validation->set_rules('question', 'question', 'required');
        if($this->form_validation->run() === TRUE){
        	$name = $this->input->post('name');
        	$email = $this->input->post('email');
        	$uid = customer_id();
            $support=array(
                    'name'=>$name,
                    'email'=>$email,
                    'is_public_support'=>1,
                    'customer_id'=>$uid,
                    'subject'=>$this->input->post('subject'),
                    'question'=>$this->input->post('question'),
                    'created'=>date('Y-m-d h:i:s'),
                    );
            // print_r($support);
            // die();
            $last_id = $this->store_model->insert('supports',$support);
            $token=str_pad($last_id, 5, "0", STR_PAD_LEFT);                 
            $token_new= date('y').$token;
            $resp = $this->store_model->update('supports',array('token' => $token_new), array('id' => $last_id));
            if ($resp){             
                $subject = $this->input->post('subject');
                $message = $this->input->post('question');

                $this->sendmail_to_superadmin($token_new,$email,$name,$subject,$message);
                 $this->load->library('smtp_lib/smtp_email');
                 $subject = 'Successfully recieved query';                                     // Subject for email
                 $from = array("no-reply@shirtscore.com" =>'shirtscore.com');              // From email in array form

                 $to = array(
                        $email
                        );                                                                  // To email address in array form

                 $html = "<em><strong>Hello</strong></em> <br>
                        <p>".$name." Thank you for contacting with us, <br> We have recieved your Query and we will respond back to you soon.</p>
                 ";

                 $is_fail = $this->smtp_email->sendEmail($from, $to, $subject, $html);
                 // print_r($is_fail);
                 // die();
            } 
            $this->session->set_flashdata('success_msg', 'query Successfully submitted');
            redirect('store/need_help');      
        }

        $data['template'] = 'store/need_help';
        $this->load->view('templates/store_template', $data);  
    }

    public function sendmail_to_superadmin($token_new,$email,$name,$subject1,$message){
        $query = $this->store_model->get_row('users', array('user_role' => 0));
        $superadmin_email =  $query->email;
        // echo "<br> superadmin_email = ".$superadmin_email;
        $this->load->library('smtp_lib/smtp_email');
        $subject = $token_new;
        $from = array("no-reply@shirtscore.com" =>'shirtscore.com');
        $to = array(         
                $superadmin_email                               
        );                                 
        $html = "<em><strong>Support Query</strong></em> <br>
                <p> Name -".$name."</p>
                <p> Email -".$email."</p>
                <p> Subject -".$subject1."</p>
                <p> Message -".$message."</p>
                <strong>Token no. :</strong> <strong>".$token_new."</strong><br><br>";
        $this->smtp_email->sendEmail($from, $to, $subject, $html);
            
    }

    public function fbshare($id=null, $url=''){
    	$data['result'] = $this->store_model->get_row('design', array('id' => $id));

    	if ($url == '')
    		$data['url'] = base_url().'store/design_info/'.$data['result']->slug;
    	else
    		$data['url'] = $url;
		// print_r($data); die();
		$this->load->view('fbshare',$data);
		
	}
	// Waseem work

	public function my_products($offset=0){

		if(!$this->session->userdata('my_store'))
			redirect('store');

		$data['offset']=$offset;
		$limit=6;
		$data['products']=$this->store_model->my_products($limit, $offset);
		// print_r($data['designs']);
		// die()
		$config = get_theme_pagination();
		$config['base_url'] = base_url().'store/my_products/';
		$config['total_rows'] = $this->store_model->my_products(0, 0);
		$config['per_page'] = $limit;
		$config['num_links'] = 5;
		$config['uri_segment'] = 3;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();
		$data['cat_id'] = '';
		
		$data['design_category'] = $this->store_model->get_result('design_category');
		
		if($this->session->userdata('my_store')){
			$my_store = $this->session->userdata('my_store');
			$data['store_info'] = $my_store;
			$user_id = $my_store->user_id;
			$data['template'] = 'store/admin_products';
	  		$this->load->view('templates/store_template', $data);
		}else{
			redirect('store');
		}
	}

	public function designs($sort_by='most-liked',$category_slug='-', $search='-',$offset=0){				
	
		if ($this->input->post('search')){
			$search = $this->input->post('search');
		}

		$data['offset']=$offset;
		$data['sort']=$sort_by;

		if ($category_slug != '-' && !empty($category_slug))
			$data['cat_info']=$this->store_model->get_row('design_category',array('slug'=>$category_slug));

		$data['cat']=$category_slug;
		$data['keyword']=$search;
		$limit=12;
		$data['designs']=$this->store_model->designss($limit, $offset, $data['sort'], $data['cat'], $data['keyword']);
		$total_rows = $this->store_model->designss(0, 0, $data['sort'], $data['cat'], $data['keyword']);
		if($search != '-' && !empty($search) && $data['designs']){
			$is_fitered=FALSE;
			if(!empty($category_slug) && $category_slug != '-'){
				$category=$this->store_model->get_row('design_category',array('slug'=>$category_slug));
				if ($category) {
					$is_fitered=TRUE;
					foreach ($data['designs'] as $key => $dsn){
						$cats = unserialize($dsn->category);
						if(!in_array($category->id, $cats) || ($dsn->status == 0)){
							unset($data['designs'][$key]);
						}
					}
				}
			}

			if(!$is_fitered && (count($data['designs']) > 0)){
				foreach ($data['designs'] as $key => $dsn){
					if ($dsn->status == 0) {
						unset($data['designs'][$key]);
					}
				}
			}

			if (empty($data['designs'])){
				$total_rows = 0;
				$data['designs'] = FALSE;
			}
			else{
				$total_rows = count($data['designs']);
				$data['designs'] = array_slice($data['designs'], $offset, $limit);
			}

			// echo "<pre>";
			// print_r($data['designs']);
			// echo "</pre>";
			// die();

		}
		$config = get_theme_pagination();
		// var_dump($sort_by);
		// var_dump($category_slug);
		// var_dump($search);
		$config['base_url'] = base_url().'store/designs/'.$sort_by.'/'.$category_slug.'/'.$search.'/';
		$config['total_rows'] = $total_rows;
		$config['per_page'] = $limit;
		$config['num_links'] = 5;
		$config['uri_segment'] = 6;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();
		$data['cat_id'] = '';
		
		
		
		if($this->session->userdata('my_store')){
			$my_store = $this->session->userdata('my_store');
			$data['store_info'] = $my_store;
			$store_id=$my_store->id;
			
			$user_id = $my_store->user_id;
			$data['category'] = $this->store_model->filter_category($store_id);
			$design_array=array();
			 $unique='';
			 if(!empty($data['category'])){
			foreach ($data['category'] as  $row) {
				$category=unserialize($row->category);
				
				//print_r($category);
				foreach ($category as $row1) {
				$design_array[]=$row1;
				
				}				
			}			}
			$unique=array_unique($design_array);
			
			 $unique=implode(',', $unique);
			$data['design_category'] = $this->store_model->filter_category_multi($unique);
			//print_r($data['design_category']);
			//die;
			$data['template'] = 'store/admin_store';
	  		$this->load->view('templates/store_template', $data);
		}else{
			$data['design_category'] = $this->store_model->get_result('design_category');
			$data['template'] = 'store/designs';
	        $this->load->view('templates/store_template', $data);
		}
	}


	public function create_my_design($design_id=''){
		$design=$this->store_model->get_row('design',array('status'=>1, 'id'=>$design_id));
		if (!$design)
			redirect('store');
		$this->design_info($design->slug);
	}
    
    public function store_product($prod_id=''){
    	if ($prod_id == '' )
    		redirect('store/my_products');

		$data['product']=$this->store_model->get_row('products',array('id'=>$prod_id));
		if (!$data['product']) {
			redirect('store/my_products');
		}
		$size_id = unserialize($data['product']->size_id);
	   	$data['sizes'] = $this->store_model->get_prod_size($size_id);
		$data['template'] = 'store/store_product';
        $this->load->view('templates/store_template', $data);
	}

	public function design_recreation(){
		/*print_r($_POST);
		echo "<br>FILES";
		print_r($_FILES);
		echo "<br>GET";
		print_r($_GET);*/
		//$aa= json_decode(stripslashes($_POST['recreation_product']));
		//print_r($aa);
		//$data['template'] = 'store/design_recreation';

		if(isset($_POST['recreation_product']) && !empty($_POST['recreation_product'])){
			$recreation_product= json_decode(stripslashes($_POST['recreation_product']));
			print_r($recreation_product);
			/*$x = 363;
			$y = 267;
			$im_dest = imagecreatetruecolor ($x, $y);
			imagealphablending($im_dest, false);


			foreach ($recreation_product as $r_p) {
			foreach ($r_p->elements as $row) {
			echo $row->source;


			$im = imagecreatefrompng($row->source);
			//$im1 = imagecreatefrompng('1.png');

			//imagecopy($im_dest, $im1, 0, 0, 0, 0, $x, $y);
			imagecopy($im_dest, $im, 0, 0, 0, 0, $x, $y);

			}
			}

			imagesavealpha($im_dest, true);
			imagepng($im_dest, 'small_redfade.png');*/
		}
		   $this->load->view('store/design_recreation');
		/*$image = imagegrabscreen();
		imagejpeg($image,"assets/uploads/test/my_screenshot.png");
		imagedestroy($image);*/
        /* $image = imagegrabscreen();
		imagejpeg($image,"assets/uploads/test/my_screenshot.jpeg");
		imagedestroy($image);*/

		//$contents=file_get_contents();
		/*$img=imagecreatefromstring($contents);
		$img_path="assets/uploads/test/my_screenshot.jpg"; 
		imagejpeg($img,$img_path);*/
	}

	public function design_save(){
		ini_set('memory_limit',"64M");
		//phpinfo();

		if (empty($_POST))
			redirect('store/design_your_own');
		$custom_upload=array();
		$f_file_name='';
		$b_file_name='';
		if(!empty($_POST['f_custom_img'])):
			$base64_str1 = substr($_POST['f_custom_img'], strpos($_POST['f_custom_img'], ",")+1);
			$decoded1 = base64_decode($base64_str1);
			$f_file_name='front_custom_'.time().'.png';		
			$png_url1 = 'assets/uploads/test/custom_uploads/'.$f_file_name; 
			$result1 = file_put_contents($png_url1, $decoded1);
		endif;

		if(!empty($_POST['b_custom_img'])):
			$base64_str2 = substr($_POST['b_custom_img'], strpos($_POST['b_custom_img'], ",")+1);
			$decoded2 = base64_decode($base64_str2);

			$b_file_name='back_custom_'.time().'.png';		
			$png_url2 = 'assets/uploads/test/custom_uploads/'.$b_file_name; 
			$result2 = file_put_contents($png_url2, $decoded2);
		endif;

		$cupload_flag=FALSE;
		if(!empty($f_file_name)){ 
			$custom_upload['f_custom_img']=$f_file_name; 
			$cupload_flag=TRUE;
		}else{
			$custom_upload['f_custom_img']='';
		}

		if(!empty($b_file_name)){ 
			$custom_upload['b_custom_img']=$b_file_name; 
			$cupload_flag=TRUE;
		}else{
			$custom_upload['b_custom_img']='';
		}

		$assets= json_decode(stripslashes($_POST['assets']));
		$product_id=0;
		$design_id_arr=array();
		$text_id_arr=array();
		$price = 0;
		if(isset($_POST['assets']) && !empty($_POST['assets']) ){
			$assets= json_decode(stripslashes($_POST['assets']));
			foreach ($assets as $asset) {
				$i=0;
				$j=0;

				foreach ($asset->elements as $row) {
					if($i==0){
						$product_title = $row->title;
					 	$product_id = $row->parameters->product_id;
					}
					else{
						if ($row->type == 'image') {
							if ($row->parameters->slug == 1) {
								if (element($row->parameters->design_id, $design_id_arr)) {
									$design_id_arr[$row->parameters->design_id]['design_qty']++;
									$design_id_arr[$row->parameters->design_id]['price'] = number_format($row->parameters->price,2);
								}else{
									$design_id_arr[$row->parameters->design_id]['design_qty'] = 1;
									$design_id_arr[$row->parameters->design_id]['price'] = number_format($row->parameters->price,2);
								}
							}
						} else {
							$text_id_arr[] = array(
													'text' 		=> $row->parameters->text,
													'textSize' 	=> $row->parameters->textSize,
													'font' 		=> $row->parameters->font,
													'color' 	=> $row->parameters->currentColor,
													'price' 	=> $row->parameters->price,
											);
						}
					}

					$price += $row->parameters->price;
					$i++;
				}
			}

			// die();
			//////// Creating Image ////////
			$base64_str = substr($_POST['base64_image'], strpos($_POST['base64_image'], ",")+1);

			$decoded = base64_decode($base64_str);
			// $prod_img = 'new-design-me'.date('Ymdhis').'.png'; // Upload path => assets/uploads/custom_prod_img/img_name
			 $png_url = 'assets/uploads/custom_prod_img/new-design-me'.date('Ymdhis').'.png'; //Upload path => assets/uploads/custom_prod_img/img_name
			$png_url = 'assets/uploads/test/test.png'; // Upload path => assets/uploads/custom_prod_img/img_name
			$result = file_put_contents($png_url, $decoded);
			$img = $this->crop_test();
			//////// Creating Image ////////
			$product_used = $this->store_model->get_row('products', array('id' => $product_id));

			$custom_product = array(
									'slug'=>$product_used->slug,
									'desc'=>$product_used->desc,
									'size_id'=>$product_used->size_id,			
									'category'=>$product_used->category,			
									'group_id'=>$product_used->group_id,
									'prefix'=>$product_used->prefix,
									'regular_name'=>$product_used->regular_name,
									'short_name'=>$product_used->short_name,
									'main_image'=>$img['front_image'],
									'back_image'=>$img['back_image'],
									'singular'=>$product_used->singular,
									'product_used'=>$product_id,
									'is_customized'=>1,
									'is_purchased'=>0,
									'price'=>$price,
									'is_custom_uploaded'=>$cupload_flag,
									'front_upload_image'=>$custom_upload['f_custom_img'],
									'back_upload_image'=>$custom_upload['b_custom_img'],
									'created' => date('Y-m-d H:i:s')
							 );

			$custom_prod_id = $this->store_model->insert('products',$custom_product);

			$arr_data=array(
					'custom_product'	=>	$custom_prod_id,
					'product_used'		=>	$product_id,
					'design_id'			=>	serialize($design_id_arr),
					'texts'				=>	serialize($text_id_arr),
					'product_image'		=>	$img['front_image'],
					'back_image'		=>	$img['back_image'],
					'product_title'		=>	$product_used->regular_name,
					'price'				=>	$price,
					'created'			=>	date('Y-m-d h:i:s')
			);



			if($this->session->userdata('design_your_own_products')){
				$this->session->set_userdata('design_your_own_products', '');	
				$this->session->unset_userdata('design_your_own_products');
			}
			
			$this->session->set_userdata('design_your_own_products',$arr_data);


			// $arr_data['assets'] = stripslashes($_POST['assets']);

			// $arr_data['base64_str'] = $base64_str;

			// $this->store_model->insert('custom_product',$arr_data);

			/*if ($this->session->userdata('design_array')) {
				$design_info = $this->session->userdata('design_array');
			}
			
			foreach ($design_id_arr as $d_id => $pdata) {
				$design_info[$custom_prod_id][$d_id] = array(
				'design_id' 	=> $d_id,
				'product_id' 	=> $custom_prod_id,
				'design_qty'	=> $pdata['design_qty'],
				'qty'			=> 1,
				'design_price'  => number_format($pdata['price'],2),
				'total'			=> $pdata['design_qty'] * $pdata['price']
				);
			}
			
			if(isset($design_info))
				$this->session->set_userdata('design_array1', $design_info);
			else
				$this->session->set_userdata('design_array1', FALSE);*/

			

				redirect('store/custom_product_info/'.$custom_prod_id);
		}else{
			exit('Sorry no data submited please try again.');
		}
	}

	public function custom_product_info($slug=''){
		//$this->output->enable_profiler(TRUE);
		//print_r($this->session->userdata('design_your_own_products'));
		$product =$this->store_model->get_row('products', array('id' => $slug));
	//	print_r($product);
		//die;
		if($product){
			$data['product'] =$product;
			$size_id = unserialize($product->size_id);
	   		$data['sizes'] = $this->store_model->get_prod_size($size_id);
		}else{
			$data['product']=FALSE;
			$data['sizes']=FALSE;
		}
		$data['latest_design'] = $this->store_model->get_limited_result('design', array('status'=>'1'),8); //new change
		$data['template'] = 'store/custom_product';
	    $this->load->view('templates/store_template', $data);
	}

	public function crop_test(){		
	  $path = './assets/uploads/test/';
	  $path_of_file = $path.'test.png';
      $data2 = getimagesize($path_of_file);
      // echo $path_of_file;
      $targ_w = $data2[0];
      $targ_h = $data2[1];
      $png_quality = 0;
      $img_r = imagecreatefrompng($path_of_file);
      $dst_r = ImageCreateTrueColor( $targ_w, ($targ_h/2) );
      imagecopyresampled($dst_r,$img_r,0,0,0,0,$targ_w,$targ_h,$targ_w,$targ_h);
      $front_image = "front_image".date('Ymdhis').".png";
      $new_image = "./assets/uploads/test/temp/".$front_image;
      imagepng($dst_r, $new_image ,$png_quality);
      $this->load->library('image_lib');
      $this->create_views($front_image);
      imagecopyresampled($dst_r,$img_r,0,0,0,($targ_h/2),$targ_w,$targ_h,$targ_w,$targ_h);
      $back_image = "back_image".date('Ymdhis').".png";
      $new_image = "./assets/uploads/test/temp/".$back_image;
      imagepng($dst_r, $new_image ,$png_quality);
      $this->create_views($back_image);
      return array('front_image' => $front_image, 'back_image' => $back_image);
	}

    public function create_views($new_image='',$path='./assets/uploads/test/temp/'){
		$config2['image_library'] = 'gd2';
	    $config2['source_image'] = $path.$new_image;
	    $config2['new_image'] = './assets/uploads/test/thumbnail/'.$new_image;
	    // $config2['new_image'] = $path.'/'.$file;
	    $config2['quality'] = '100%';
	    $config2['maintain_ratio'] = TRUE;
	    $config2['width'] = 300;
	    $config2['height'] = 500;
	    $this->image_lib->initialize($config2);
	    if ( ! $this->image_lib->resize()){
	       echo $this->image_lib->display_errors();
	       exit;
	    }
	    $this->image_lib->clear();
	}

	public function add_to_cart_custom($product_id = ''){
		//print_r($_POST); 
		//echo "123";

		if(empty($_POST)) redirect('store/custom_product_info/'.$product_id);

		if($this->session->userdata('my_store')){
			$my_store = $this->session->userdata('my_store');
			$store_id = $my_store->id;
			$store_name = $my_store->store_name;
		}else{
			$default_admin_info = default_admin_info();
			$store_id = $default_admin_info->id;
			$store_name = $default_admin_info->store_name;
		}
		$custom_product = array();

		/*if ($this->session->userdata('design_your_own_products')) {
			$custom_product = $this->session->userdata('design_your_own_products');
		}else{
			redirect('store/design_your_own');
		}
*/
		//print_r($this->session->userdata('design_your_own_products'));
		//die;
		//$id = $custom_product['custom_product'];
		
		//$new_arr_for_sizes = array();
		/*foreach ($_POST as $keyf => $valuef) {
			$pos1 = stripos($keyf, "sizes_");
			if($pos1 !== FALSE){
				$arrr = explode('_', $keyf);
				if($valuef != '0' && $valuef != '')	
					$new_arr_for_sizes[] = array( "size_id" => $arrr[1] , "qty" => $valuef );
			}
		}*/
		// if ($this->session->userdata('design_array1'))
	 //            $data1 = $this->session->userdata('design_array1');

		//if(count($new_arr_for_sizes) > 0){
			//$d_data = array();

	      //  if ($this->session->userdata('design_array'))
	         //   $d_data = $this->session->userdata('design_array');

		  // 	foreach($new_arr_for_sizes as $varr){
			//   	$size_id = $varr['size_id'];
			//	$qty = $varr['qty'];
		if ($this->session->userdata('design_your_own_products')) {
					$custom_product = $this->session->userdata('design_your_own_products');
				}else{
					redirect('store/design_your_own');
				}
		$size_id = $this->input->post('size_id');
				$qty = $this->input->post('qty');
				$size = $this->store_model->get_size($size_id);
		

			$product_info=$this->store_model->get_row('products',array('id'=>$custom_product['custom_product']));
	    	$product_used_id=$product_info->product_used;
	    	$product_price=$product_info->price;

	    	$product_used=$this->store_model->get_row('products',array('id'=>$product_used_id));
	    	$product_default_price=$product_used->price;

	    	$designs_price=$product_price - $product_default_price;

		    $size_details=$this->store_model->get_row('product_size_price',array('size_id'=>$size_id,'product_id'=>$product_used_id));

		   // print_r(  $size_details); die;
		  	$price= $size_details->price + $designs_price;

		  	/*$data['colors'] = $this->store_model->get_row('product_colors',array('product_id' => $product_used_id,'id' => $this->input->post('this_color')));*/
		   
	       

				

				if ($this->session->userdata('color_info')) {
					$color = $this->session->userdata('color_info');
					$color_code = $this->store_model->get_color_code($color['color_id']);
					$color_id = $color['color_id'];
				}else{					
					$product = $this->store_model->get_row('product_colors', array('product_id' => $custom_product['product_used'], 'is_default' => 1));
					$color_code = $product->color_code;
					$color_id = $product->id;
				}

				$size = $this->store_model->get_size($size_id);

				

				$id = $custom_product['custom_product'];




				$cart_details=array(
									'Product_id' 	 => $custom_product['custom_product'],
									'Product_Simple' 	 => FALSE,
									'Product_used' 	 => $custom_product['product_used'],
									'Is_package' 	 => FALSE,
									'Size_id'    	 => $size_id,
					           		'Color_id'   	 => $color_id,
					           		'Size'    	 	 => $size,
					           		'Color_code' 	 => $color_code,
									'Images'     	 => $custom_product['product_image'],
									'Back_Images'    => $custom_product['back_image'],
									'Path'			 =>	base_url()."assets/uploads/custom_prod_img/",
					           		'Store_name' 	 => $store_name,
					           		'Store_id'   	 => $store_id,
					           		'Design_id'     => $custom_product['design_id']					           		
					           		);

				if($custom_product['product_title'] == '')
					$custom_product['product_title'] = "Custom Shirt";

				$data = array( 'id'      => $custom_product['custom_product'],
				               'qty'     => $qty,
				               'price'   => number_format($price ,2),
				               'name'    => $custom_product['product_title'],
				               'options' => $cart_details);
				
				$rowid = $this->cart->insert($data);

				$this->store_model->update('products',array('price'=>$price),array('id'=>$custom_product['custom_product']));
 //die;
            
			

		//	print_r($d_data); die;
/*
	        $this->session->userdata('design_array', '');

	        $this->session->unset_userdata('design_array');

	        $this->session->set_userdata('design_array', $d_data);*/

	       // $this->session->userdata('design_array1', '');

	       // $this->session->unset_userdata('design_array1');


	        $this->session->unset_userdata('color_info');
	        $this->session->unset_userdata('design_your_own_products');
		
		redirect('store/cart');
	}

	public function create_cart_form_product_editor(){		
			$uniqid=$this->session->userdata('product_editor');
			$design_your_own=$this->store_model->get_all_design_your_own($uniqid);
			foreach ($design_your_own as $row) {
				$store=$this->store_model->get_row('stores',array('id'=>$row->store_id));
				
				$designs=$this->store_model->get_all_design_for_your_own(unserialize($row->design_id));

				if(is_array($designs) && !empty($designs)) $design_price=array_sum($designs); else $design_price=0;
				$total_price = $row->price+$design_price;
				/*
				$cart_details=array(
							'Product_id' => $design_your_own->id,
							'Is_package' => FALSE,
							'Size_id'    => $size_id,
			           		'Color_id'   => $color_id,
			           		'Size'    	 => $size,
			           		'Color_code' => $color_code,
							'Images'     => $design_your_own->main_image,
			           		'Store_name' => $store_name,
			           		'Store_id'   => $store_id
			           		);

				$data = array( 'id'      => $design_your_own->id ,
		               'qty'     => 1,
		               'price'   => number_format($product_price,2),
		               'name'    => $design_your_own->regular_name,               
		               'options' => $cart_details);
		// print_r($product);
		// print_r($cart_details);

			$this->cart->insert($data);
			redirect('store/cart');*/

		}


	}


	public function test(){
		
		//$design_your_own_id=$this->session->userdata('design_your_own_id');
		$design_your_own_id=27;
		$design_your_own_row=$this->store_model->get_row('design_your_own',array('id'=>$design_your_own_id));
		///echo '<img src="'.$design_your_own_row->base64_str.'">'; die;
		/*$base64_str2=substr($design_your_own_row->base64_str, strpos($design_your_own_row->base64_str, ",")+1);
		$decoded = base64_decode($base64_str2);
		//$base64_str2=$design_your_own_row->base64_str;
		//$decoded=$base64_str2;
		
		$result = file_put_contents($png_url, $decoded);*/
		$png_url = trim('assets/uploads/test/').'new-design-joe-'.date('Ymdhis').'.png';	

			$base64_str = substr($design_your_own_row->base64_str, strpos($design_your_own_row->base64_str, ",")+1);
			
			$decoded = base64_decode($base64_str);
			$png_url = trim('assets/uploads/test/').'new-design-me2'.date('Ymdhis').'.png';		
			$result = file_put_contents($png_url, $decoded);


		
		if($result) {				
			//$this->store_model->update('design_your_own', array('user_id'=>$uid),array('id' => $design_your_own_id));
			//$this->session->unset_userdata('design_your_own_id');
			//echo "YES";
		}else {
			exit('Error: while creating new desing.');
		}
		
	}

	public function custom_gear(){
		$data['faq']=$this->store_model->get_result('faq');
		$data['template'] = 'store/custom_gear';
		$this->load->view('templates/store_template', $data);
	}

	public function error_page(){
		$data['error_msg'] = ' 404 Error !!! ';
		$this->session->unset_userdata('storeid');
		$data['template'] = 'store/no_store';
		$this->load->view('templates/store_template', $data);
	}

	public function admins_stores($offset=0){
		$limit=10;
		$data['stores']=$this->store_model->admins_stores($limit, $offset);
		$config = get_theme_pagination();
		$config['base_url'] = base_url().'store/admins_stores/';
		$config['total_rows'] = $this->store_model->admins_stores(0, 0);
		$config['per_page'] = $limit;
		$config['num_links'] = 5;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();
		$data['template'] = 'store/admins_stores';
  		$this->load->view('templates/store_template', $data);
  	}

 //  	public function designs($sort_by='most-liked',$category_slug='-', $search='-',$offset=0){				
	
	// 	if ($this->input->post('search')){
	// 		$search = $this->input->post('search');
	// 	}

	// 	$data['offset']=$offset;
	// 	$data['sort']=$sort_by;

	// 	if ($category_slug != '-' && !empty($category_slug))
	// 		$data['cat_info']=$this->store_model->get_row('design_category',array('slug'=>$category_slug));

	// 	$data['cat']=$category_slug;
	// 	$data['keyword']=$search;
	// 	$limit=12;
	// 	$data['designs']=$this->store_model->designss($limit, $offset, $data['sort'], $data['cat'], $data['keyword']);
	// 	$total_rows = $this->store_model->designss(0, 0, $data['sort'], $data['cat'], $data['keyword']);
	// 	if($search != '-' && !empty($search) && $data['designs']){
	// 		$is_fitered=FALSE;
	// 		if(!empty($category_slug) && $category_slug != '-'){
	// 			$category=$this->store_model->get_row('design_category',array('slug'=>$category_slug));
	// 			if ($category) {
	// 				$is_fitered=TRUE;
	// 				foreach ($data['designs'] as $key => $dsn){
	// 					$cats = unserialize($dsn->category);
	// 					if(!in_array($category->id, $cats) || ($dsn->status == 0)){
	// 						unset($data['designs'][$key]);
	// 					}
	// 				}
	// 			}
	// 		}

	// 		if(!$is_fitered && (count($data['designs']) > 0)){
	// 			foreach ($data['designs'] as $key => $dsn){
	// 				if ($dsn->status == 0) {
	// 					unset($data['designs'][$key]);
	// 				}
	// 			}
	// 		}

	// 		if (empty($data['designs'])){
	// 			$total_rows = 0;
	// 			$data['designs'] = FALSE;
	// 		}
	// 		else{
	// 			$total_rows = count($data['designs']);
	// 			$data['designs'] = array_slice($data['designs'], $offset, $limit);
	// 		}

	// 	}
	// 	$config = get_theme_pagination();
	// 	$config['base_url'] = base_url().'store/designs/'.$sort_by.'/'.$category_slug.'/'.$search.'/';
	// 	$config['total_rows'] = $total_rows;
	// 	$config['per_page'] = $limit;
	// 	$config['num_links'] = 5;
	// 	$config['uri_segment'] = 6;
	// 	$this->pagination->initialize($config);
	// 	$data['pagination'] = $this->pagination->create_links();
	// 	$data['cat_id'] = '';
		
	// 	$data['design_category'] = $this->store_model->get_result('design_category');
		
	// 	if($this->session->userdata('my_store')){
	// 		$my_store = $this->session->userdata('my_store');
	// 		$data['store_info'] = $my_store;
	// 		$user_id = $my_store->user_id;
	// 		$data['template'] = 'store/admin_store';
	//   		$this->load->view('templates/store_template', $data);
	// 	}else{
	// 		$data['template'] = 'store/designs';
	//         $this->load->view('templates/store_template', $data);
	// 	}
	// }

  	public function available_products($sort_by='newest',$category_slug='-', $search='-',$offset=0){

  		if ($this->input->post('search')){
			$search = $this->input->post('search');
		}

		$data['offset']=$offset;
		$data['sort']=$sort_by;

		if ($category_slug != '-' && !empty($category_slug))
			$data['cat_info']=$this->store_model->get_row('design_category',array('slug'=>$category_slug));

		$data['cat']=$category_slug;

		$data['keyword']=$search;
		
		$limit=16;

		$data['products']=$this->store_model->available_products($limit, $offset, $data['sort'], $data['cat'], $data['keyword']);

		$total_rows = $this->store_model->available_products(0, 0, $data['sort'], $data['cat'], $data['keyword']);

		if($search != '-' && !empty($search) && $data['products']){
			$is_fitered=FALSE;
			if(!empty($category_slug) && $category_slug != '-'){
				$category=$this->store_model->get_row('design_category',array('slug'=>$category_slug));
				if ($category) {
					$is_fitered=TRUE;
					foreach ($data['products'] as $key => $prod){
						$cats = unserialize($prod->category);
						if(!in_array($category->id, $cats) || ($prod->product_status == 0) || ($prod->is_customized == 1)){
							unset($data['products'][$key]);
						}
					}
				}
			}

			if(!$is_fitered && (count($data['products']) > 0)){
				foreach ($data['products'] as $key => $prod){
					if ($prod->product_status == 0 || $prod->is_customized == 1) {
						unset($data['products'][$key]);
					}
				}
			}

			if (empty($data['products'])){
				$total_rows = 0;
				$data['products'] = FALSE;
			}
			else{
				$total_rows = count($data['products']);
				$data['products'] = array_slice($data['products'], $offset, $limit);
			}

		}

		$config = get_theme_pagination();
		$config['base_url'] = base_url().'store/available_products/'.$sort_by.'/'.$category_slug.'/'.$search.'/';
		$config['total_rows'] = $total_rows;
		$config['per_page'] = $limit;
		$config['num_links'] = 5;
		$config['uri_segment'] = 6;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();
		$data['cat_id'] = '';
		
  		$data['design_category'] = $this->store_model->get_result('design_category');

		$data['template'] = 'store/available_products';
  		$this->load->view('templates/store_template', $data);
  	}

  	public function product_info($slug=""){

  		if (empty($slug))
  		redirect('store/available_products');
  		$data['product'] = $this->store_model->get_row('products', array('slug' => $slug));

  		if (!$data['product']) {
  			redirect('store/available_products');
  		}

  		$size_id = unserialize($data['product']->size_id);
	   	$data['sizes'] = $this->store_model->get_prod_size($size_id);
  		$data['colors'] = $this->store_model->get_result('product_colors',array('product_id' => $data['product']->id));
  		$data['product_id'] = $data['product']->id;
		$data['template'] = 'store/product_info';
  		$this->load->view('templates/store_template', $data);
  	}

  	public function ajax_fb_login(){
  		$fb_info = $_POST;

  		if ($_POST) {
  			$this->session->set_userdata('fb_info', $_POST);
  			echo json_encode(array('status' => true));
  		}else
  			echo json_encode(array('status' => false));
  	}

  	public function fb_info(){
		$this->load->model('Login_model');				
  		$fb_info='';
  		 print_r($this->session->userdata('fb_info'));
  		 die();
  		if ($this->session->userdata('fb_info')){
  			$fb_info=$this->session->userdata('fb_info');
  			$fb_info = $fb_info['resp'];
  			$user = $this->store_model->get_row('users', array('fb_id' => $fb_info['id']));
	  		if ($user) {
				$check_info = $this->store_model->check_info($user->id);
	  			if ($check_info) {
	  				$status=$this->Login_model->fb_login($user->id);

					if($status['status'] === TRUE){
						$this->session->set_userdata('fb_info', '');
						$this->session->unset_userdata('fb_info');
						if ($status['is_storeadmin'] == 1)
							redirect('storeadmin');
						else
							redirect('user/dashboard');
					}else{
						$this->session->set_flashdata('error_msg', $status['error_msg']);
						redirect('store/signup');
					}
	  			}
	  		}

			$this->form_validation->set_message('is_natural_no_zero', 'Please enter valid value.');
			$this->form_validation->set_message('required', 'Required.');
			$this->form_validation->set_message('valid_email', 'Invalid email.');
		  	$this->form_validation->set_rules('firstname', 'Firstname', 'required');
			$this->form_validation->set_rules('lastname', 'Lastname', 'required');
			$this->form_validation->set_rules('address', 'Address', 'required');
			$this->form_validation->set_rules('city', 'City', 'required');
			$this->form_validation->set_rules('state', 'State', 'required');
			$this->form_validation->set_rules('country', 'Country', 'required');
			$this->form_validation->set_rules('zip_code', 'Zip', 'required|is_natural_no_zero');
			$this->form_validation->set_rules('email', 'email', 'required|valid_email|is_unique[users.email]');
			$this->form_validation->set_rules('c_email', 'confirm email', 'required|valid_email|matches[email]');
			if ($this->form_validation->run() == TRUE){
				$data = array(
							"fb_id" 	=> $fb_info['id'],
							"firstname" => $this->input->post('firstname'),
							"lastname" 	=> $this->input->post('lastname'),
							"email" 	=> $this->input->post('email'),
							"address" 	=> $this->input->post('address'),
							"city" 		=> $this->input->post('city'),
							"state" 	=> $this->input->post('state'),
							"country" 	=> $this->input->post('country'),
							"zip" 		=> $this->input->post('zip_code'),
							"user_role" => 3,
							"created" 	=> date('Y-m-d')
						);
				$uid = $this->store_model->insert('users',$data);
				$status=$this->Login_model->fb_login($uid);	
				if($status['status'] === TRUE){
					$this->send_registration_email($data['firstname'], $data['lastname'], $data['email']);
					if ($status['is_storeadmin'] == 1)
						redirect('storeadmin');
					else
						redirect('user/dashboard');
				}else{
					$this->session->set_flashdata('error_msg', $status['error_msg']);
					redirect('store/signup');
				}
			}
  			// $fb_info = $this->session->userdata('fb_info');
  			$data = array(
  						'id' =>$fb_info['id'] 
  					 );
	  		if (isset($fb_info['email']))
	  			$data['email'] = $fb_info['email'];
	  		else
	  			$data['email'] = '';
	  		if (isset($fb_info['first_name']))
	  			$data['firstname'] = $fb_info['first_name'];
	  		else
	  			$data['firstname'] = '';
	  		if (isset($fb_info['last_name']))
	  			$data['lastname'] = $fb_info['last_name'];
	  		else
	  			$data['lastname'] = '';
			$data['template'] = 'store/fb_info';
	  		$this->load->view('templates/store_template', $data);
  		}else{
  			$this->session->set_flashdata('error_msg', 'Info not found...');
  			redirect('store/signup');
  		}
  	}

  	public function page_content($slug = "")
    {
		if($slug != "terms_and_condition" && $slug !="privacy_policy")
		redirect('store');
		if($slug == "terms_and_condition") { $id=1; }
		if($slug == "privacy_policy") { $id=2; }
        $data['content']=$this->store_model->get_row('page_content', array('id' => $id, 'status' => 1));
        $data['template'] = 'store/pages';
        $this->load->view('templates/store_template', $data);   
    }

    public function add_cart($product_id=''){
    	if(!empty($product_id))
    	{
	    	$products = $this->store_model->get_row('products', array('id' => $product_id));
	    	
	  		if (!$products) {
	  			redirect('store');
	  		}
	  		else{
	   			$size_id = $this->input->post('size_id');
				$qty = $this->input->post('qty');
				$size = $this->store_model->get_size($size_id);
		  		$data['colors'] = $this->store_model->get_row('product_colors',array('product_id' => $products->id,'id' => $this->input->post('this_color')));

  					if(!empty($products->back_image))
  					{
  						$backimage=$data['colors']->back_image;
  					}
  					else
  					{
  						$backimage=FALSE;
  					}
    			$cart_details=array(
					'Product_id' 	 => $products->id,
					'Product_Simple' => TRUE,
					'Store_id'		 =>0,
					'Product_used' 	 => $products->id,
					'Is_package' 	 => FALSE,
					'Size_id'    	 => $size_id,
	           		'Color_id'   	 => $data['colors']->id,
	           		'Size'    	 	 => $size,
	           		'Color_code' 	 => $data['colors']->color_code,
	           		'Images'     	 => $data['colors']->main_image,
					'Back_Images'    => $backimage,
					'Path'			 =>	base_url()."assets/uploads/color_img/thumbnail/",
					'Design_id'		 => '',
	           		);
    			 $size_details=$this->store_model->get_row('product_size_price',array('size_id'=>$size_id,'product_id'=>$product_id));
				$data = array( 'id'      => $products->id,
				               'qty'     => $qty,
				               'price'   => number_format($size_details->price ,2),
				               'name'    => $products->regular_name,
				               'options' => $cart_details);
							
				$rowid = $this->cart->insert($data);
			}
				redirect('store/cart');
	  		}
		else
		{
			redirect('store');
		}
    }

  public function shipping_info(){

  	if($login = $this->check_login())
				{
					 if(customer_id())
					 	{
					 		$uid = customer_id();
					 	}
					 else {
					 	$uid = storeadmin_id();
					 }
					 $data['user_info'] = $this->store_model->get_row('users', array('id' => $uid)); 
				}
				

  	
		//print_r($data['user_info']);
		$data['state']=$this->store_model->get_result('state');
  	$data['template'] = 'store/shipping_info';
  		$this->load->view('templates/store_template', $data);
  }

  public function wear_it($slug="",$product_id='')
	{
		if(empty($slug))
		{
			redirect('store/designs');
		}
		else
		{
			$design=array('slug'=>$slug);
			$data['design']=$this->store_model->get_row('design',$design);	
			}
		$data['latest_design'] = $this->store_model->get_limited_result('design', array('status'=>'1'),8); //new change
		$data['single_product']=$this->store_model->wear_it_single_product($product_id);
		$data['products']=$this->store_model->wear_it_product();
		$size_id = unserialize($data['single_product']->size_id);
	   	$data['sizes'] = $this->store_model->get_prod_size($size_id);
  		$data['colors'] = $this->store_model->get_result('product_colors',array('product_id' => $data['single_product']->id));
		$data['template'] = 'store/wear_it';
  		$this->load->view('templates/store_template',$data);	
	}

	public function ajax_col_imgs_multi($color_id = '',$design_slug='')
	{
		if ($color_id == '')
			$error = "Undefined Color";
		else
		{	$design=array('slug'=>$design_slug);
			$data['design']=$this->store_model->get_row('design',$design);
			$color_img = $this->store_model->get_row('product_colors', array('id' => $color_id));
			$product = $this->store_model->get_row('products', array('id' => $color_img->product_id));
			if(!$color_img)
				$error = "No views available for this color";
			else
			{	
				  list($width, $height, $type, $attr) = getimagesize(base_url().'assets/uploads/color_img/'.$color_img->main_image);
              		$w_f=($width)/3;
              		$h_f=($height)/2.30;
				
				$html='<img style="max-height:80px; max-width:80px;position: relative; left:'.$w_f.'px; top:'.$h_f.'px; z-index: 1;" src="'.base_url().'assets/uploads/designs/thumbnail/'.$data["design"]->design_image.'"/>';
				$html.='<img src="'.base_url().'assets/uploads/color_img/'.$color_img->main_image.'" />';
				?>
             	<?php
				}
				$arr = array('result' => 'success', 'imgs' => $html);
				$arr = json_encode($arr);
		 		echo $arr;
		 		die();
			}
		
		if(isset($error))
		{
			$arr = array('result' => 'error', 'msg' => $error);
			$arr = json_encode($arr);
	 		echo $arr;
		}
	}


	public function create_product_design_multi($design_slug = '', $product_id =''){
		$design=array('slug'=>$design_slug);
		$data['design']=$this->store_model->get_row('design',$design);

		$design_id=$data['design']->id;
		if(empty($product_id))
		{
			$data['single_product']=$this->store_model->wear_it_single_product($product_id);
			$product_id=$data['single_product']->id;
		}

			$data['colors'] = $this->store_model->get_row('product_colors',
				array(
					'product_id' => $product_id,
					'id' => $this->input->post('this_color'),
					));
			
		//print_r($data['colors']);
		if ($product_id == '') {
	   		$product_id = $this->store_model->get_default_prod_id();
	   	}
	   	if ($this->session->userdata('current_design')) {
	   		$current_design = $this->session->userdata('current_design');
	   		if ($design_id != $current_design['design_id']) {
	   			$current_design['design_id'] = $design_id;
	   			$this->session->set_userdata('current_design', $current_design);
	   		}
	   		$design_id = $current_design['design_id'];
	   		if ($current_design['product_id'] != $product_id ) {
		   		$path = './assets/uploads/designs/merged/';
		   		//@unlink($path.$current_design['design']);
		   	}
	   	}
	   	$color_id=$data['colors']->id;
	   	$color_code=$data['colors']->color_code;

	   	$design = $this->store_model->get_current_design($design_id);
	   	if (!$design)
	   		redirect('store');
		$source_path='./assets/uploads/designs/thumbnail/';	
		$dest_path='./assets/uploads/designs/temp/';	
		$this->load->library('image_lib');
		$config2['image_library'] = 'gd2';
		$config2['source_image'] = $source_path.$design;
		$config2['new_image'] = $dest_path.$design;
		$config2['quality'] = '100%';
		$config2['maintain_ratio'] = FALSE;
		$config2['width'] = 60;
		$config2['height']	= 60;
		$this->image_lib->initialize($config2);
		if ( ! $this->image_lib->resize()){
			 echo $this->image_lib->display_errors(); 
			 exit;
		}
		$img_custom=$this->image_merged_multi($config2['new_image'], $design_id, $product_id,$color_id);
		$img_custom_front=$img_custom['front_image'];
		$img_custom_back=$img_custom['back_image'];
		//die;
		$product_used = $this->store_model->get_row('products', array('id' => $product_id));
		//$design_id_arr=array();
		$size_id = $this->input->post('size_id');
		$qty = $this->input->post('qty');
		 $size_details=$this->store_model->get_row('product_size_price',array('size_id'=>$size_id,'product_id'=>$product_id));
		$design_price=$data['design']->price;
		$product_price=$product_used->price;

		$price=$design_price+$size_details->price;
		
			$custom_product = array(
					'slug'=>$product_used->slug,
					'desc'=>$product_used->desc,
					'size_id'=>$product_used->size_id,			
					'category'=>$product_used->category,			
					'group_id'=>$product_used->group_id,
					'prefix'=>$product_used->prefix,
					'regular_name'=>$product_used->regular_name,
					'short_name'=>$product_used->short_name,
					'main_image'=>$img_custom_front,
					'back_image'=>$img_custom_back,
					'singular'=>$product_used->singular,
					'product_used'=>$product_id,
					'is_customized'=>0,
					'is_purchased'=>0,
					'price'=>$price,
					'created' => date('Y-m-d H:i:s')
					 );

					$custom_prod_id = $this->store_model->insert('products',$custom_product);	  				
		   			
					$size = $this->store_model->get_size($size_id);
			  		$data['colors'] = $this->store_model->get_row('product_colors',array('product_id' => $custom_prod_id,
					'id' => $this->input->post('this_color')));
		  				
		  			$data_design=array($design_id=>array('design_qty'=>1,'price'=>$data['design']->price));	
    				$cart_details=array(
					'Product_id' 	 => $custom_prod_id,
					'Product_Simple' 	 => FALSE,
					'Product_used' 	 => $product_used->id,
					'Is_package' 	 => FALSE,
					'Size_id'    	 => $size_id,
	           		'Color_id'   	 => $color_id,
	           		'Size'    	 	 => $size,
	           		'Color_code' 	 => $color_code,
					'Images'     	 => $img_custom_front,
					'Back_Images'    => $img_custom_back,
					'Path'			 =>	base_url()."assets/uploads/custom_prod_img/",
					'Design_id'		 => serialize($data_design),
	           		'Store_name' 	 => '',
	           		'Store_id'   	 => ''
	           		);

				if($custom_product['slug'] == '')
					$custom_product['slug'] = "Custom Shirt";

				$data = array( 'id'      =>  $custom_prod_id,
				               'qty'     => $qty,
				               'price'   => number_format($price ,2),
				               'name'    => $custom_product['regular_name'],
				               'options' => $cart_details);
				
				$rowid = $this->cart->insert($data);
			
				redirect('store/cart');
           	}
		

	public function image_merged_multi($item = 0, $design_id = 0, $product_id = '',$color_id='')
	{
		
		$product = $this->store_model->get_prod_image_color($color_id);
		$frame='assets/uploads/color_img/'.$product;
		
		$bg = imagecreatefromstring(file_get_contents($frame));
		$over = imagecreatefromstring(file_get_contents($item));
		$data1 = getimagesize($frame);
		$data2 = getimagesize($item);
		$over_x_w = $data2[0];
		$over_y_h = $data2[1];
		 $bg_x_w = (int) ($data1[0]/2);
		$bg_x_w = $bg_x_w - ($over_x_w/2);
		$bg_y_h = (int) ($data1[1]/4);
		$bg_y_h = $bg_y_h - ($over_y_h/2);

		// die();
		imagealphablending($bg, true);
		imagesavealpha($bg, true);
		imagecopy($bg, $over, $bg_x_w, $bg_y_h, 0, 0, $over_x_w, $over_y_h);
		// imagecopy($bg, $over, 100, 50, 0, 0, 72, 72);
		// imagecopymerge($bg, $over, 130, 100, 0, 0, 80, 80, 100);
		// $new_image = substr($product, 0, -4);
		$design_name='f_design-prod'.date('Ymdhis').'.png';
		$new_image = './assets/uploads/test/temp/'.$design_name;

		$design_name_b='';
		imagepng($bg,$new_image );
		$design_arr = array(
							'only_name' => $new_image, 
							'design' => './assets/uploads/test/temp/'.$design_name,
							'design_id' => $design_id, 
							'product_id' => $product_id 
							);

		$this->session->set_userdata('current_design',$design_arr);

		$source_path='./assets/uploads/test/temp/';	
		$dest_path='./assets/uploads/test/thumbnail/';	
		$this->load->library('image_lib');
		$config2['image_library'] = 'gd2';
		$config2['source_image'] = $source_path.$design_name;
		$config2['new_image'] = $dest_path.$design_name;		
		$config2['quality'] = '100%';
	    $config2['maintain_ratio'] = TRUE;
	    $config2['width'] = 300;
	    $config2['height'] = 500;
		$this->image_lib->initialize($config2);
		if ( ! $this->image_lib->resize()){
			 echo $this->image_lib->display_errors(); 
			 exit;
		}
		$back_image= $this->store_model->get_row('product_colors',array('id'=>$color_id));
		if(!empty($back_image->back_image))
		{
			$source_path='./assets/uploads/color_img/';	
			$dest_path='./assets/uploads/test/thumbnail/';	
			$this->load->library('image_lib');
			$config2['image_library'] = 'gd2';
			$config2['source_image'] = $source_path.$back_image->back_image;
			$config2['new_image'] = $dest_path.'b_design-prod'.date('Ymdhis').'.png';		
			$config2['quality'] = '100%';
		    $config2['maintain_ratio'] = TRUE;
		    $config2['width'] = 300;
		    $config2['height'] = 500;
			$this->image_lib->initialize($config2);
			//die;
			if ( ! $this->image_lib->resize()){
				 echo $this->image_lib->display_errors(); 
				 exit;
			}
			else
			{
				$design_name_b='b_design-prod'.date('Ymdhis').'.png';
			}

			$source_path='./assets/uploads/color_img/';	
			$dest_path='./assets/uploads/custom_prod_img/';	
			$this->load->library('image_lib');
			$config2['image_library'] = 'gd2';
			$config2['source_image'] = $source_path.$back_image->back_image;
			$config2['new_image'] = $dest_path.'b_design-prod'.date('Ymdhis').'.png';		
			$config2['quality'] = '100%';
		    $config2['maintain_ratio'] = TRUE;
		    $config2['width'] = 300;
		    $config2['height'] = 500;
			$this->image_lib->initialize($config2);
			//die;
			if ( ! $this->image_lib->resize()){
				 echo $this->image_lib->display_errors(); 
				 exit;
			}
		}
			return $uplod=array('front_image'=>$design_name,
								'back_image'=>$design_name_b);			
		}

	public function get_design_category_ajax(){
		$html='';
		$html .='<option value="0">Select Category</option>';
		if($design_category=$this->store_model->get_result('design_category')){
			$i=0;
			foreach ($design_category as $row) { $i++;
				if($i==1) $select='selected="selected"'; else $select='';
			$html .='<option value="'.$row->id.'" '.$select.' >'.ucfirst($row->category_name).'</option>';	
			}
		}else{
			$html .='<option value="0">NO design category found</option>';		
		}

		echo $html;
	}

	public function get_design_ajax($design_id=''){
		
		$designs =$this->store_model->get_design_ajax($design_id);
		
		if($designs){
			echo json_encode(array('STATUS'=>1,'DATA'=>$designs));
		}else{
			echo json_encode(array('STATUS'=>0,'DATA'=>''));
		}	
		//print_r($designs);
	}

	public function get_size_detail()
	{
		 $html = '';
	    if($_POST['product_id'] && $_POST['size_ids'] ) {
		  
		    $size_details=$this->store_model->get_result('product_size_price',array('size_id'=>$_POST['size_ids'],'product_id'=>$_POST['product_id']));
	       foreach($size_details as  $size_details):
		   $html .= $size_details->price;
		   endforeach;
		echo number_format($html,2);  
		}	
	}

	public function get_size_detail_cus()
	{
		 $html = '';
	    if($_POST['product_id'] && $_POST['size_ids'] ) {

	    	$product_info=$this->store_model->get_row('products',array('id'=>$_POST['product_id']));
	    	$product_used_id=$product_info->product_used;
	    	$product_price=$product_info->price;

	    	$product_used=$this->store_model->get_row('products',array('id'=>$product_used_id));
	    	$product_default_price=$product_used->price;

	    	$designs_price=$product_price - $product_default_price;

		    $size_details=$this->store_model->get_result('product_size_price',array('size_id'=>$_POST['size_ids'],'product_id'=>$product_used_id));
	       foreach($size_details as  $size_details):
		   $html .= $size_details->price + $designs_price;
		   endforeach;
		echo number_format($html,2); 
		}	
	}

	public function del_sess($value='')
	{
		$this->session->sess_destroy();
	}

	public function facebook_test(){  

		$config=array(
		'appId'  => '755963451096030',
		'secret' => '5fa5109d146e0f7a102dad6dcdb72fc5'
		);

	  	$this->load->library('facebook/facebook', $config);

		// Get User ID
		$user = $this->facebook->getUser();
		
		if ($user) {			


		  try {
		    // Proceed knowing you have a logged in user who's authenticated.
		    $user_profile = $this->facebook->api('/me');

		     print_r($user_profile); 
		  } catch (FacebookApiException $e) {
		    error_log($e);
		    $user = null;
		  }
		}

		// Login or logout url will be needed depending on current user state.
		if ($user) {
		  $logoutUrl = $this->facebook->getLogoutUrl();

		 	 echo anchor( $logoutUrl ,'Logout');
		} else {
		  $statusUrl = $this->facebook->getLoginStatusUrl();
		  $loginUrl = $this->facebook->getLoginUrl(array(
'scope' => 'email',
'redirect_uri'=> base_url().'user/fb_login_check'
));

		   echo anchor( $loginUrl ,'Login with Facebook');
		}

	}


	public function fb_login_check($value=''){
		$config=array(
		'appId'  => '755963451096030',
		'secret' => '5fa5109d146e0f7a102dad6dcdb72fc5'
		);

	  	$this->load->library('facebook/facebook', $config);

		// Get User ID
		$user = $this->facebook->getUser();
		
		if ($user) {			


		  try {
		    // Proceed knowing you have a logged in user who's authenticated.
		    $user_profile = $this->facebook->api('/me');

		     print_r($user_profile); 
		  } catch (FacebookApiException $e) {
		    error_log($e);
		    $user = null;
		  }
		}
	}

 function fb_login(){
		
		$loginUrl='';
			$config=array(
			'appId'  => FB_APP_ID,
			'secret' => FB_APP_SECRET);
			$this->load->library('facebook/facebook', $config);
			$user = $this->facebook->getUser();
			if ($user) {
				try {
				// Proceed knowing you have a logged in user who's authenticated.
				$user_profile =  $this->facebook->api('/me');
				
				} catch (FacebookApiException $e) {
					error_log($e);
					$user = null;
				}
			}
			 $loginUrl = $this->facebook->getLoginUrl(array(
			 	'scope' => 'email',
			 	'redirect_uri'=> base_url().'user/fb_login_check'
			 	)
			 );
			  echo anchor( $loginUrl ,'Login with Facebook');
	}

	/*public function fb_login_check_new(){			
		$config=array(
			'appId'  => FB_APP_ID,
			'secret' => FB_APP_SECRET);

		$this->load->library('facebook/facebook', $config);
		$user = $this->facebook->getUser();
		
		if ($user) {
			$user_profile = (object) $this->facebook->api('/me');
			print_r($user_profile );
		}else{			
			echo "FALSE";
		}
	}*/
}
