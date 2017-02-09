<?php $uri_segment = $this->uri->segment(2); ?>
<!DOCTYPE html>
<html class="sidebar_default  no-js" lang="en">
<head>
<meta charset="utf-8">
<title>shirtscore | Superadmin Panel</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="<?php echo base_url() ?>assets/theme/css/images/favicon.png">
<!-- Le styles -->
<link href="<?php echo base_url() ?>assets/theme/css/twitter/bootstrap.css" rel="stylesheet">
<link href="<?php echo base_url() ?>assets/theme/css/base.css" rel="stylesheet">
<link href="<?php echo base_url() ?>assets/theme/css/twitter/responsive.css" rel="stylesheet">
<link href="<?php echo base_url() ?>assets/theme/css/jquery-ui-1.8.23.custom.css" rel="stylesheet">
<script src="<?php echo base_url() ?>assets/theme/js/plugins/modernizr.custom.32549.js"></script>
<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <![endif]-->
</head>

<body>
<div id="loading"><img src="<?php echo base_url() ?>assets/theme/img/ajax-loader.gif"></div>
<div id="responsive_part">
  <div class="logo"> <a href="index.html"><span>Start</span><span class="icon"></span></a> </div>
  <ul class="nav responsive">
    <li>
      <button class="btn responsive_menu icon_item" data-toggle="collapse" data-target=".overview"> <i class="icon-reorder"></i> </button>
    </li>
  </ul>
</div>
<!-- Responsive part -->

<div id="sidebar" class="">
  <div class="scrollbar">
    <div class="track">
      <div class="thumb">
        <div class="end"></div>
      </div>
    </div>
  </div>
  <div class="viewport ">
    <div class="overview collapse">
      <div class="search row-fluid container">
        <h2>Search</h2>
        <form class="form-search">
          <div class="input-append">
            <input type="text" class=" search-query" placeholder="">
            <button class="btn_search color_4">Search</button>
          </div>
        </form>
      </div>
      <ul id="sidebar_menu" class="navbar nav nav-list container full">

        <?php if( $uri_segment=='') $active_class='active'; else $active_class='';  ?> 

        <li class="accordion-group <?php echo $active_class; ?> color_4"> <a class="dashboard " href="<?php echo base_url() ?>admin"><img src="<?php echo base_url() ?>assets/theme/img/menu_icons/dashboard.png"><span>Dashboard</span></a> </li>

        <?php if($uri_segment==='view_users' || $uri_segment==='add_new_user' || $uri_segment==='view_user_detail' || $uri_segment==='update_user'){ $active_class='active'; }else{ $active_class='';  } ?> 

        <li class="accordion-group <?php echo $active_class; ?> color_7"> <a class="accordion-toggle widgets collapsed " data-toggle="collapse" data-parent="#sidebar_menu" href="#collapse1"> <img src="<?php echo base_url() ?>assets/theme/img/menu_icons/users.png"><span>Manage Users</span></a>
          <ul id="collapse1" class="accordion-body collapse">
            <li><a href="<?php echo base_url()."admin/view_users"?>">View Users</a></li>
            <li><a href="<?php echo base_url()."admin/add_new_user"?>">Add User</a></li>           
          </ul>
        </li>

        <?php if($uri_segment==='view_deals' || $uri_segment==='add_new_deal' || $uri_segment==='update_deal'){ $active_class='active'; }else{ $active_class='';  } ?> 

        <li class="accordion-group  <?php echo $active_class; ?> color_24"> <a class="accordion-toggle widgets collapsed" data-toggle="collapse" data-parent="#sidebar_menu" href="#collapse5"> <img src="<?php echo base_url() ?>assets/theme/img/menu_icons/files.png"><span>Manage Deals</span></a>
        <ul id="collapse5" class="accordion-body collapse">
            <li><a href="<?php echo base_url()."admin/view_deals"?>">View Deals</a></li>             
            <!-- <li><a href="<?php // echo base_url()."admin/add_new_deal/basic_setting"?>">Create new deal</a></li>   -->           
           
        </ul>
        </li>   

        
        <?php if($uri_segment==='view_profile' || $uri_segment==='update_password' || $uri_segment==='logout'){ $active_class='active'; }else{ $active_class='';  } ?>

          <li class="accordion-group <?php echo $active_class; ?> color_25"> <a class="accordion-toggle widgets collapsed"   data-toggle="collapse" data-parent="#sidebar_menu" href="#collapse12" > <img src="<?php echo base_url() ?>assets/theme/img/menu_icons/settings.png"><span>Logout</span></a> 
            <ul id="collapse12" class="accordion-body collapse">
              <li><a href="<?php echo base_url().'admin/view_profile/'.get_admin_id(); ?>">Profile</a>
              </li>         
               <li><a href="<?php echo base_url().'admin/update_password/'; ?>"><i class=" icon-cog"></i>Update Password</a></li>
              <li><a href="<?php echo base_url()."admin/logout"?>">Logout</a></li>       
            </ul>
           </li>

      </ul>
      <div class="menu_states row-fluid container ">
        <h2 class="pull-left">Menu Settings</h2>
        <div class="options pull-right">
          <button id="menu_state_1" class="color_4" rel="tooltip" data-state ="sidebar_icons" data-placement="top" data-original-title="Icon Menu">1</button>
          <button id="menu_state_2" class="color_4 active" rel="tooltip" data-state ="sidebar_default" data-placement="top" data-original-title="Fixed Menu">2</button>
          <button id="menu_state_3" class="color_4" rel="tooltip" data-placement="top" data-state ="sidebar_hover" data-original-title="Floating on Hover Menu">3</button>
        </div>
      </div>
      <!-- End sidebar_box --> 
      
    </div>
  </div>
</div>
<div id="main">
  <div class="container">
    
    <div class="header row-fluid">
      <div class="logo"> <a href="<?php echo base_url() ?>admin"><span>Start</span><span class="icon"></span></a> </div>
      <div class="top_right">
        <ul class="nav nav_menu">
          <li class="dropdown"> <a class="dropdown-toggle administrator" id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="/page.html">
            <div class="title"><span class="name"><?php $admin_info= $this->session->userdata('admin_info'); echo  $admin_info['fname']." ".$admin_info['lname'];?></span></div>


            <span class="icon"><img src="<?php echo base_url() ?>assets/theme/img/user.png"></span></a>
            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
              <li><a href="<?php echo base_url().'admin/view_profile/'.get_admin_id(); ?>"><i class=" icon-user"></i>View Profile</a></li>
              <li><a href="<?php echo base_url().'admin/update_profile/'.get_admin_id(); ?>"><i class=" icon-user"></i> Update Profile</a></li>
              <li><a href="<?php echo base_url().'admin/update_password/'; ?>"><i class=" icon-cog"></i>Update Password</a></li>
              <li><a href="<?php echo base_url()."admin/logout"?>"><i class=" icon-unlock"></i>Log Out</a></li>
             <!--  <li><a href="search.html"><i class=" icon-flag"></i>Help</a></li> -->
            </ul>
          </li>
        </ul>
      </div>
      <!-- End top-right --> 
    </div>

