
    <div id="main_container">
      <div class="row-fluid ">     	

        <div class="span12">

        	<?php if($this->session->flashdata('success_msg')){ ?>
		    <div class="alert alert-success">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong>Success :</strong> <br> <?php echo $this->session->flashdata('success_msg'); ?>
			</div>
			<?php } ?>
			<br>

          <div class="box paint color_0">
            <div class="title">
              <h4> <i class=" icon-user"></i> <span> Edit Parameters </span> </h4>
            </div>
            <!-- End .title -->
 <!--  -->          
       <div class="content">
  				<?php echo form_open_multipart(current_url(),array('class'=>'form-horizontal row-fluid')); ?> 
                                      
                <div class="form-row control-group row-fluid">
                  <label class="control-label span3" for="normal-field">Size
                  <span class="help-block"><?php echo form_error('size'); ?></span>
                </label>
                  <div class="controls span9">
                    <input type="text"   name="size" value="<?php echo $parameters->size; ?>" placeholder="Size">
                  </div>
                </div>              
                 <div class="form-row control-group row-fluid">
                  <label class="control-label span3" for="hint-field">Price
                    <span class="help-block"><?php echo form_error('price'); ?></span> 
                  </label>
                  <div class="controls span9">
                    <input type="text"  name="price" value="<?php echo $parameters->price; ?>" placeholder="Price">
                  </div>
                </div> 
                 <div class="form-row control-group row-fluid">
                  <label class="control-label span3" for="hint-field">Weight
                    <span class="help-block"><?php echo form_error('weight'); ?></span> 
                  </label>
                  <div class="controls span9">
                    <input type="text"   name="weight" value="<?php echo $parameters->weight; ?>" placeholder="Weight">
                  </div>
                </div>                 
                <div class="form-actions row-fluid">
                <div class="span3 visible-desktop"></div>
                  <div class="span7 ">
                    <button type="submit" class="btn btn-primary">Submit</button>                    
                  </div>
                </div>
            <?php echo form_close(); ?>
            </div>
             <!--  -->

            <!-- End row-fluid --> 
          </div>
          <!-- End .content --> 
        </div>
        <!-- End box --> 
      </div>
      <!-- End .span12 --> 
    </div>  