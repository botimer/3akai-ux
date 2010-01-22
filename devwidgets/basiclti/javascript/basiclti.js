/*
 * Licensed to the Sakai Foundation (SF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The SF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/*global $, sdata, Config, addBinding */

var sakai = sakai || {};

sakai.basiclti = function(tuid,placement,showSettings){
	var currentSubContainer = ""; // The current subcontainer (get/set)
	var json = false; // json object
	var me; // me object
	var me_json; // json me object
	var rootel = $("#" + tuid);
	
	/**
	 * Reset the values of the json object
	 */
	var resetValues = function(){
		json = {};
	};
	
	/**
	 * Get the me object
	 * @param {Boolean} refresh Refresh the me object or not
	 */
	var getMe = function(){
		me = sdata.me;
		me_json = me.profile;	
	};
	
		
	/**
	 * Render the template of a container
	 * @param {String} container Container that will be rendered
	 */
	var renderTemplate = function(container){
        if (showSettings) {
            var jsonToString = '';
            var functionOnComplete = function() { sdata.container.informFinish(tuid); };
            var saveUrl = Config.URL.SDATA_FETCH_BASIC_URL.replace(/__PLACEMENT__/, placement).replace(/__TUID__/, tuid);
            sdata.widgets.WidgetPreference.save(saveUrl, "basiclti", jsonToString, functionOnComplete);
        }
        else {
            $.getJSON('/basiclti/launch.json', function(data) {
                var url = data.launchURL;
                var html = '<form id="basiclti_launch" method="post" action="' + url  + '">';
                var pd = data.postData;
                for (k in pd) {
                    if (k != 'basiclti_submit')
                        html += '<input type="hidden" name="' + k + '" value="' + pd[k] + '" />';
                }
                html += '<input type="submit" id="basiclti_submit" name="' + 'basiclti_submit' + '" value="' + pd['basiclti_submit'] + '" />';
                html += '</form>';
                html += '<script type="text/javascript">document.getElementById("basiclti_submit").style.display="none";';
                html += 'document.basiclti_launch.submit();</script>';

                switch (container) {
                    case "main":
                        var fr = $('<iframe src="/devwidgets/basiclti/basicltiform.html" id="basiclti_launch_frame" height="800" width="640" border="0"></iframe>');
                        $(fr).bind('load', function(evt) {
                            $('#launch_form', evt.target.contentWindow.document).append(html);
                        });
                        $('#basiclti_tool_container').append(fr);
                        break;
                }
            });
        }
	};

	/**
	 * Add binding
	 * @param {String} container Container were the binding should be added
	 */
	var addBinding = function(container){
            alert('addBinding');

		/**
		 * Bind the radiobuttons to switch between 2 views
		 */
		//$("input[name=twitter_input_get_set]").bind("click",function(e,ui){
			//showSubContainer(e.target.id.replace("twitter_input_", ""));
		//});
	};
	
	/**
	 * Function that will be launched if the widget is loaded
	 */
	var init = function(){
		getMe();
		resetValues();
        ///// AJAX CALL FOR DATA
		renderTemplate("main");
		//addBinding("get_status");
		//renderTemplate("error");
		
		$("#basiclti_main_container").show();
	};
	init();
};

sdata.widgets.WidgetLoader.informOnLoad("basiclti");
