/*
 * This file is part of Stare.
 *
 * Copyright(c) 2018 bla5r
 * https://github.com/bla5r
 *
 * This file may be licensed under the terms of of the
 * GNU General Public License Version 2 (the ``GPL'').
 *
 * Software distributed under the License is distributed
 * on an ``AS IS'' basis, WITHOUT WARRANTY OF ANY KIND, either
 * express or implied. See the GPL for the specific language
 * governing rights and limitations.
 *
 * You should have received a copy of the GPL along with this
 * program. If not, go to http://www.gnu.org/licenses/gpl.html
 * or write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

var lProjectName = null;
var lProjectVersion = null;
var lProjectPath = null;
var lProjectLang = null;

var rProjectName = null;
var rProjectVersion = null;
var rProjectPath = null;
var rProjectLang = null;

$(window).resize(function() {
	diffViewer.layout();
});

$("#lSelector").change(function() {
	if ($(this).val() != "none") {
		lProjectName = $(this).find(":checked").attr("data-name");
		lProjectVersion = $(this).find(":checked").attr("data-version");
		lProjectPath = "./projects/" + $(this).val() + "/";
		lProjectLang = $(this).find(":checked").attr("data-lang");
		loadLeftExplorer(lProjectPath);
		console.log("[LOG] Loading " + lProjectName + " (" + lProjectVersion + ") on the left side");
	}
});

$("#rSelector").change(function() {
	if ($(this).val() != "none") {
		rProjectName = $(this).find(":checked").attr("data-name");
		rProjectVersion = $(this).find(":checked").attr("data-version");
		rProjectPath = "./projects/" + $(this).val() + "/";
		rProjectLang = $(this).find(":checked").attr("data-lang");
		loadRightExplorer(rProjectPath);
		console.log("[LOG] Loading " + rProjectName + " (" + rProjectVersion + ") on the right side");
	}
});

$("#syncButton").click(function() {
	if (rProjectPath != null && originalFilename != null) {
		_loadRightExplorer(rProjectPath + originalFilename);
	}
});

$(document).ready(function() {
	$.post( "/fetch", function(data) {
  		$(".selectorSidebar").html(data);
	});
});