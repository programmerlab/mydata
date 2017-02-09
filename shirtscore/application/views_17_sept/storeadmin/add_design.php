

<div class="dashcontent" style="margin-top:0;">  
<?php //echo validation_errors(); ?>         
          <div class="dashbox">
    		<h2>Upload New Design</h2>
          <hr color="#ccc" />
      <?php if($this->session->flashdata('error_msg')){ ?>
          <div class="alert alert-error">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>Error :</strong><br><?php echo $this->session->flashdata('error_msg'); ?>
          </div>
      <?php } ?>    
        <?php echo form_open_multipart(current_url(), array("id" => "add_design_form"),array('class'=>'form-horizontal')); ?>
        <div class="well clearfix">
            
             <span><strong>Upload your design</strong><!-- <small>minimum image dimension of 600 x 600 pixels and 200 DPI or greater.</small> --></span> <br>

             <input type="file" id="my_design" name="designfile" ><br><br>
            <input type="hidden" id="img_size_error" name="img_size_error" value="<?php echo strip_tags(form_error('designfile')); ?>" >

          <strong>Add design to your stores</strong><br />
         <small><b>To select more than one store press and hold control key while selecting stores.<br>
                    If you select "None" it will not appear in any of your approved store.</b></small><br /><br />

          <select class="span5" name="store_id[]" multiple="multiple" style="height:130px;">  
          <option value="not_store">None</option>          
            <?php foreach ($stores as $key): ?>              
              <option value="<?php echo $key->id ?>" <?php if(!empty($store_id)){ if(in_array($key->id, $store_id)){ echo "selected='selected'";} } ?> ><?php echo $key->store_name; ?></option>
            <?php endforeach ?>
          </select><span style="color:red" ><?php echo form_error('store_id[]') ?> </span><br />

          <strong>The Artist</strong><br />
          <input class="span5" type="text" name="artist" value="<?php echo set_value('artist'); ?>">
          <span style="color:red" ><?php echo form_error('artist') ?> </span><br />


         <strong>Design Title</strong>  <br />
          <input class="span5" id="title" type="text" name="design_title" value="<?php echo set_value('design_title'); ?>" /><span style="color:red"><?php echo form_error('design_title'); ?></span> <br />

           <strong>Design Title look on url</strong><br />
          <input class="span5" readonly="readonly" type="text" id="slug" name="slug" value="<?php echo set_value('slug'); ?>" />
          <span style="color:red"><?php echo form_error('slug'); ?> </span><br />
          <span>(if you want to add design video then select anyone below option.)</span><br/>
           <strong>Design video url</strong>&nbsp;&nbsp;&nbsp;
            <input type="radio" name="design_video_type" id="video_url" value="1" <?php if($_POST['design_video_type']=='1') echo 'checked="checked"'; ?>/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
         <strong>Upload your video about design</strong>&nbsp;&nbsp;&nbsp;
         <input type="radio" name="design_video_type" id="video_upload" value="2" <?php if($_POST['design_video_type']=='2') echo 'checked="checked"'; ?>/><br /><br />
          



          <span id="upload_video" <?php  if($_POST['design_video_type'] == '2'): echo 'style="display:block"'; else: echo 'style="display:none"'; endif; ?>>
          <strong>Upload your video about design</strong>(optional)<br />
          <input class="span5" type="file"  name="upload_video"/><br />
          (upload video file type i.e  .mp4, .flv | Max file size: 9MB)<br />
          <span style="color:red"><?php echo form_error('upload_video'); ?> </span><br />
          </span>
          
          <span id="design_video" <?php if($_POST['design_video_type'] == '1'): echo 'style="display:block"'; else: echo 'style="display:none"'; endif; ?>>
          <strong>Design video url</strong><br />
          <input class="span5" type="text"  name="design_video" value="<?php if(!empty($_POST['design_video']))echo $_POST['design_video']; ?>" placeholder="Enter Video Url l.e youtube, vimeo" />
          <span style="color:red"><?php echo form_error('design_video'); ?> </span><br />
          </span>

         <strong>Description</strong><br/>
          <textarea class="span5" name="description"><?php echo set_value('description'); ?></textarea>
          <span style="color:red" ><?php echo form_error('description') ?> </span><br>


           <span><strong>Categories</strong> <br><small>You can select max 3 Categories.</small></span><br />
          <div class="controls span12">
              <?php //print_r($category_arr); ?>
              <div class="row-fluid">
                <?php $c_no = 1; $cat_count = 1; ?>
                <?php foreach ($category as $row): ?>
                  <?php if($c_no == 5): ?>
                    </div>
                    <div class="row-fluid">
                      <?php $c_no = 1; ?>
                  <?php endif ?>
                  <div class="span3"><input type="checkbox"  class="row-fluid" name="category[]" value="<?php echo $row->id; ?>" <?php if(!empty($category_arr)){ if(in_array($row->id, $category_arr)  && ($cat_count < 4)){ echo "checked='checked'"; $cat_count++;} } ?> > <?php echo ucfirst($row->category_name); ?></div>
                <?php $c_no++; ?>
                <?php endforeach ?>
              </div>
           
          </div>
<span style="color:red"><?php echo form_error('category'); ?> </span><br />
         <!--  <?php // foreach ($category as $row): ?>                                          
                  <input type="checkbox" <?php // echo set_checkbox('category', $row->id); ?> name="category[]" value="<?php // echo $row->id; ?>"> <?php // echo $row->category_name ?>
          <?php // endforeach ?> <br /> -->

        
      
<div class="clearfloat"></div>
<div class="dashicon">
&nbsp;<i class="icon-upload-alt"></i>&nbsp;
</div>

<p><input type="checkbox" required="required" style="height: 22px;width: 22px;" /> I declare that I have the right to use, market, distribute and sell the content I am uploading. I also declare that the content I am uploading complies with the Guidelines and Restrictions (above) as well as Shirtscore.com <a target="_blank" href="<?php echo base_url(); ?>store/pages/user-agreement">User Agreement</a> and <a target="_blank" href="<?php echo base_url(); ?>store/pages/privacy-policy">Privacy Policy</a>.</p>

 <input type="submit" onclick="showLoader();" class="btn-success btn update_cart" id="add_design" value="Upload Design" />
 <img id="loader_image" src="<?php echo base_url() ?>assets/images/design-submit.gif" style="display:none;position: fixed;top: 20%;opacity: 0.3;">
 <?php echo form_close(); ?>
</div>

          <h3>Guidelines and Restrictions for uploading designs</h3>
          <p><strong>You must read and agree to the following guidelines to continue.</strong></p>
          <p>You may not upload or sell merchandise using any image described below, unless you own the image and/or have a license or authorization to use such image. For more information please review the <a target="_blank" href="<?php echo base_url(); ?>store/pages/user-agreement">User Agreement</a> and <a target="_blank" href="<?php echo base_url(); ?>store/pages/privacy-policy">Privacy Policy</a>.</p>
          <p><strong>NO UNOFFICIAL DESIGNS PERMITTED</strong> You can not use the names or images of people, celebrities, musicians, athletes, professional sports teams, trademarked logos, etc. without permission. <a href="#">Learn more...</a></p>
          <p><strong>NO TRADEMARK USE OF NAMES/LOGOS OF COMPANIES OR ORGANIZATIONS</strong> e.g., Microsoft, Pepsi, Green Peace. <a href="#">Learn more...</a></p>
          <p><strong>NO DOWNLOADED INTERNET CONTENT, IMAGES, GRAPHICS OR DESIGNS ARE PERMITTED WITHOUT AUTHORIZATION</strong> <a href="#">Learn more...</a></p>

</div></div>

<script type="text/javascript">
  $(document).ready(function() {
    $("#add_design_form").submit(function() {
      $("#loader_image").show();
    });
    $("#title,#slug").on('change keyup blur',function(){
      var stringToReplace = $(this).val().toLowerCase();
      stringToReplace = $.trim(stringToReplace);
      var desired = stringToReplace.replace(/[^a-zA-Z0-9\s-]/gi, '');
      desired = desired.replace(/[^a-zA-Z0-9-]/gi, '-');
      $('#slug').val(desired);
    });

      //$('#upload_video').hide();
           $('#video_url').click(function(){
            $('#upload_video').hide();
            $('#design_video').show();
          });
          
          $('#video_upload').click(function(){
            $('#upload_video').find('.uploader').css('display','block');
            $('#upload_video').find('input').css('opacity','40');
            $('#upload_video').find('.filename,.action').css('display','none');
            $('#upload_video').show();
            $('#design_video').hide();
          });
  });
</script>

  <div class="clearfloat"></div>
  <style type="text/css">
  hr{
    border-color:#3B5998; 
    /*-moz-use-text-color: #FFFFFF !important; */
  }
</style>