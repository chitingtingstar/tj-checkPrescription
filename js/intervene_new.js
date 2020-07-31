/**
 * Created with IntelliJ IDEA.
 * User: RongRong
 * Date: 15-10-27
 * * Time: ����11:25
 * To change this template use File | Settings | File Templates.
 */

function freshList() {
    var intervalForFresh = 10;
//    var intervalForFresh = $("#intervalForFresh").val();
//    if(isNaN(intervalForFresh) || intervalForFresh <= 0){
//        alert("��������������ֵ!");
//        return;
//    }
    setInterval(function () {
        var intervalForSearch = $("#intervalForSearch").val();
        if (isNaN(intervalForSearch) || intervalForSearch <= 0) {
            alert("��������������ֵ")
            return;
            intervalForSearch = 10;
        }
        var patient_id = $("#patient_id").val();
        var errorType = $(".errorSelect").val();

        AjaxInterface.getIntervenePresc(intervalForSearch, patient_id, errorType, function (blMessage) {
//            alert(blMessage.success);
        })
    }, intervalForFresh * 1000);
}

function closePrescDetail(id) {
    $(".output").hide();
    $("#prescDetail" + id).hide();
}

function showPrescDetail(id) {
    $(".output").hide()
    $("#prescDetail" + id).show();
}

function getSelectedCheckInfo() {
    var allCheckboxList = document.getElementsByName("checkbox_id");
    var cnt = 0;
    var values = "";
    var valueList = new Array();

    for (var i = 0; i < allCheckboxList.length; i++) {
        var checkbox = allCheckboxList[i];
        if (checkbox.checked) {
            valueList.push(checkbox.value);
            cnt++;
            if (cnt == 1) {
                values = checkbox.value;
            } else {
                values += "," + checkbox.value;
            }
        }
    }
    return {
        cnt: cnt,
        values: values,
        valueList: valueList
    };
}

/**
 * ��ȡ��ѡҽ��������ҽ������
 */
function sighToView() {
    var __ret = getSelectedCheckInfo();
    var cnt = __ret.cnt;
    var values = __ret.values;
    // var valuesList = __ret.valueList;
    /************�¼Ӵ���***************/
    var inputTempList = new Array();

    $('#dataTable tbody').find('input[type = "checkbox"]:checked').each(function () {
        var $obj = $(this).parent().nextAll();
        var temp = {};
        temp.patient_id = $obj.eq(1).children().html().trim();
        temp.pres_date = $obj.eq(2).html().trim();
        temp.presc_id = $obj.eq(3).html().trim();
        temp.problemDrugs = $obj.eq(7).html().trim();
        temp.problemTypes = $obj.eq(8).html().trim();
        temp.warningInfos = $obj.eq(9).html().trim();
        temp.drugCount = $obj.eq(10).html();
        temp.groupCount = $obj.eq(11).html();
        temp.patient_name = $obj.eq(12).html();
        temp.inpatient_no = $obj.eq(13).html();
        temp.doctor_code = $obj.eq(14).html();
        temp.doctor_name = $obj.eq(15).html();
        temp.dept_code = $obj.eq(16).html();
        temp.dept_name = $obj.eq(17).html();
        temp.id = $obj.eq(18).html();
        temp.visitId = $obj.eq(19).html();

        $(this).parent().parent().remove();
        inputTempList.push(temp);
    })

    /************�¼Ӵ���***************/

    var tag = $("#tag").val();
    if (cnt == 0) {
        alert("��ѡ���¼");
    } else {

        try {
            AjaxInterface.sighToView(values, tag, inputTempList, $("#pharId").val(), $("#pharName").val(), function (blMessage) {
                if (blMessage.success) {
                    $("#id_head").removeAttr("checked");
                }
                else {
                    alert(blMessage.message);
                }
            });
        } catch (e) {
            alert("���ܱ�Ǹô���");
        }
    }
}

function sighToViewb(id) {
    AjaxInterface.sighToView(id, function (blMessage) {
        $("#record" + id).hide();
        $("#prescDetail" + id).hide();
    });
}

//pres_date��ʽ yyyy-mm-dd hh:mm:ss
/**
 *
 * @param id
 * @param contextPath
 * @param obj
 * @param queryFlag
 * @param pres_date
 * @param displaySomeError
 * @param interveneAfter
 * @param newTag
 * @param pres_id
 * @param realTime  0-��ʵʱ��1-ʵʱ
 */
function intervene_new(id, contextPath, obj, queryFlag, pres_date, displaySomeError, interveneAfter, newTag, pres_id, realTime, patientId, doctorId) {
    try {
        $("#playAudio")[0].pause();
        $("#playAudio")[0].currentTime = 0;
    } catch (e){
        //  do nothing
    }


    id = id.replace('+', '%2B');
    id = encodeURI(encodeURI(id));
    if (pres_id != undefined) {
        pres_id = pres_id.replace('+', '%2B');
        pres_id = encodeURI(encodeURI(pres_id));
    } else {
        pres_id = "";
    }

    if (patientId == undefined) patientId = "";
    if (doctorId == undefined) doctorId = "";

    /**
     * 2019-06-11
     * ���½���뵯����ҳ�洫�ݵĲ���
     */
    var userIdParam = $("#userIdParam").val();
    var userNameParam = $("#userNameParam").val();

    $(obj).css("color", "pink");
    var iWidth = 1000; //���ڿ��
    var iHeight = 700; //���ڿ��
    var iTop = (window.screen.height - iHeight - 60) / 2;
    var iLeft = (window.screen.width - iWidth) / 2;
    var tag = $("#tag").val();
    if (queryFlag == undefined) queryFlag = 0;
    if (pres_date == undefined) pres_date = "";
    if (displaySomeError == undefined) displaySomeError = 0;
    if (interveneAfter == undefined) interveneAfter = 0;
    if (newTag == undefined) newTag = 0;
    if (pres_id == undefined) pres_id = "";
    if (realTime == undefined) realTime = 0;

    var url = contextPath + "/interveneDetail_new.action?id=" + id + "&tag=" + tag + "&queryFlag=" + queryFlag + "&pres_date=" + pres_date + "&displaySomeError=" + displaySomeError + "&interveneAfter=" + interveneAfter + "&newTag=" + newTag + "&pres_id=" + pres_id+ "&realTime=" + realTime+ "&userIdParam=" + userIdParam+ "&userNameParam=" + userNameParam + "&patientId=" + patientId + "&doctorId=" + doctorId;
    if (newTag == 1) {
        window.open(url, "_blank", "status=yes, Scrollbars=yes,Toolbar=no,Location=no,Direction=no,Width=" + window.screen.width + " ,Height=" + window.screen.height + ",top=" + iTop + ",left=" + iLeft);
    } else {
        window.open(url, "interveneDetail_new", "status=yes, Scrollbars=yes,Toolbar=no,Location=no,Direction=no,Width=" + window.screen.width + " ,Height=" + window.screen.height + ",top=" + iTop + ",left=" + iLeft);
    }
}

function interveneB() {
    var __ret = getSelectedCheckInfo();
    var cnt = __ret.cnt;
    var values = __ret.values;
    if (cnt == 0) {
        alert("��ѡ���¼");
    } else if (cnt > 1) {
        alert("ֻ�ܹ�ѡһ����¼");
    } else {
        intervene(values);
    }
}

function saveInterveneInfo(softPass) {
    /**
     * 2018-04-30
     * ����ϵͳ���ã��Ƿ����ö���ȷ��
     */
    var doubleConfirm = $("#doubleConfirm").val();
    if (doubleConfirm == 1 && softPass == 0) {
        var con = confirm("ȷ�Ϸ����Ԥ��");
        if (!con) {
            return false;
        }
    }

    if (undefined == softPass) {
        softPass = 0;
    }

    var tag = $("#tag").val();
    var interveneAfter = $("#interveneAfter").val();
    var prescIdsTemp = $("#prescIdsTemp").val();
    var id = $("#id").val();
    //��������Ϣ����д��CheckInterMaster��Intervention��
    var interventionInfo = setInterventionInfo();
    var checkInterMaster = setCheckInterMaster(interveneAfter);

    if (1 == interveneAfter) {
        checkInterMaster.pres_id = id;
        interventionInfo.pres_id = id;
    }

    try {
        var checkInterDetailList = handleClickEvent(interventionInfo, interveneAfter, id);
    } catch (e) {
        alert(e);
        return;
    }

    var desc = '';
    $('#realValue .errorInfo').each(function () {
        /*if (interveneAfter == 1)
            desc += $(this).find('input[name=""]').val() + '\n';*/
        desc += ('��ҩʦ��ԤҩƷ��') + $(this).find('input[name="ordersName"]').val() + '\n';
        // ҩʦ��Ԥ����ƴ���߼�
        // ���"û��ҩʦѡ��ĸ�Ԥ������������",��ֻƴ�ӹ�ѡ���Ļ�����˵�����
        // ��������������ж��Ƿ�ѡ���ˣ�ҩʦѡ�������ǿգ���ȡҩʦѡ������⣻������ȡ������˵�����
        var problem = $(this).find('.case_type input').val();
        var pharmProblem = $(this).find('.case_type_phar textarea').val();
        if (pharmProblem != undefined && pharmProblem != "") {
            problem = pharmProblem;
        }

        desc += ('��ҩʦ��Ԥ���⡿' + problem) + '\n';
        desc += $(this).find('.case_description textarea').val() + '\n';
    })

    var modifyAdvice = "";
    var advice = $("#modifyAdvice").val();
    if (advice != "")
        modifyAdvice = '���޸������ ' + $("#modifyAdvice").val();
    if ($('#phone').val() != '')
        modifyAdvice += ('\n��ҩʦ��ϵ�绰�� ' + $('#phone').val());

    /**
     * ����δ��Ԥ�Ĵ�������
     */
    $(".ordersRow input[name = 'checkbox_id']").each(function () {
        if (!$(this).is(':checked')) {
            var orderNo = $(this).parent().parent().find('.orderId').html().trim();
            var checkInterDetail = handleAEventNotInter(orderNo);

            if (1 == interveneAfter)
                checkInterDetail.pres_id = id;

            checkInterDetail.intervention_flag = 0;
            checkInterDetailList.push(checkInterDetail);
        }
    });

    if (1 == interveneAfter) {
        if (1 == softPass) {
            if (!confirm("ȷ����˸ô���û��������"))
                return;
        }

        $("#interventionButton").attr('disabled', 'disabled');

        AjaxInterface.saveInterveneInfoAdviceAfter(interventionInfo,  checkInterMaster, checkInterDetailList,
            id, tag,  desc + modifyAdvice, prescIdsTemp, desc, softPass, function (blMessage) {
                if (blMessage.success) {
                    if (0 == softPass) {
                        alert("��Ԥ�ɹ�!");
                    }
                }
                else {
                    alert('�ȴ�ʱ�䳬ʱ');
                    $("#interventionButton").removeAttr('disabled');
                }
                window.opener.location.href = window.opener.location.href;
                window.close();
            })
    } else {
        AjaxInterface.saveInterveneInfoAdvice(interventionInfo, checkInterMaster, checkInterDetailList,
            id, tag, desc + modifyAdvice, function (blMessage) {
                if (blMessage.success) {
                    // alert("�ɹ��ύ��Ԥ��Ϣ���ȴ�ҽ����Ӧ!");
                }
                else {
                    alert('�ȴ�ʱ�䳬ʱ');
                    $("#interventionButton").removeAttr('disabled');
                }
                window.opener.location.href = window.opener.location.href;
                window.close();
            })
    }

}

/**
 * ҩʦѡ�������¼��Ĵ���
 * ������ѡ���⣬ҩƷ���ҵ���Ӧ��ҽ����ҽ�����⣬��������Ӧ������ֵ��
 * @param interventionInfo
 */

function handleClickEvent(interventionInfo, interveneAfter, id) {
    //��ϸ��
    var checkInterDetailList = [];
    //�������Ʊ�
    var pharChooseProblemsSet = new Set();

    //��ÿһ����ԤҩƷ������
    $('#realValue').children().each(function () {
        var $chooseValues = $(this).find('input[type=checkbox]:checked');

        var orderNo = $(this).find('input[name="orderNo"]').val();
        var checkInterDetail = handleAEvent(orderNo, pharChooseProblemsSet);

        if (1 == interveneAfter) {
            checkInterDetail.pres_id = id;
            if ("" == checkInterDetail.pharmacist_id || null == checkInterDetail.pharmacist_id || "null" == checkInterDetail.pharmacist_id) {
                checkInterDetail.pharmacist_id = $("#userIdParam").val();
                checkInterDetail.pharmacist_name = $("#userNameParam").val();
            }
        }

        checkInterDetail.intervention_flag = 1;
        checkInterDetail.pharm_item_cat = $(this).find('.case_type_phar textarea').val();


        /*$chooseValues.each(function () {
            pharChooseProblemsSet.add($(this).val());
        })*/
        pharChooseProblemsSet.add(checkInterDetail.pharm_item_cat);

        checkInterDetailList.push(checkInterDetail);
    })

    // ����ҩʦѡ��ĸ�Ԥ����
    var case_type_pharmacist = "";
    pharChooseProblemsSet.forEach(function (item) {
        case_type_pharmacist += item.toString();
    })

    interventionInfo.case_type_pharmacist = case_type_pharmacist;

    return checkInterDetailList;
}

/**
 * ����һ������
 * @param orderNo
 * @param errorNameList
 */
function handleAEvent(orderNo) {
    var prescDetail = orderNo2PrescJSON[orderNo];
    var list = mapJSON[orderNo];

    // var errorName = value;
    var checkDetail = setCheckInterventionDetail();
    setPrescDetail(checkDetail, prescDetail);

    if (list != null && list.length > 0) {
        var errorProblem = list[0];
        checkDetail.item_name = errorProblem.errorName;
        checkDetail.warn_level = errorProblem.warning_level;
        checkDetail.warn_info = errorProblem.error_message;
        checkDetail.refer_info = errorProblem.remark;
    }

    return checkDetail;

}

/**
 * ����һ������
 * @param orderNo
 * @param errorNameList
 */
function handleAEventNotInter(orderNo) {
    var prescDetail = orderNo2PrescJSON[orderNo];
    var list = mapJSON[orderNo];

    var checkDetail = setCheckInterventionDetail();
    setPrescDetail(checkDetail, prescDetail);

    if (list != null && list.length > 0) {
        var errorProblem = list[0];
        checkDetail.item_name = errorProblem.errorName;
        checkDetail.warn_level = errorProblem.warning_level;
        checkDetail.warn_info = errorProblem.error_message;
        checkDetail.refer_info = errorProblem.remark;
    }

    return checkDetail;
}

/**
 * ��Ԥ����������봦����������Ϣ
 * @param checkDetail
 * @param prescDetail
 */
function setPrescDetail(checkDetail, prescDetail) {
    checkDetail.pres_id = $("#prescNo").val();
    checkDetail.pres_date = $("#presc_date").val();
    checkDetail.order_no = prescDetail.order_no;
    checkDetail.order_sub_no = prescDetail.order_sub_no;
    checkDetail.pk_order_no = prescDetail.pk_order_no;
    checkDetail.drug_lo_id = prescDetail.drug_code;
    checkDetail.drug_lo_name = prescDetail.drug_name;
    checkDetail.repeat = prescDetail.repeat;
    checkDetail.administration = prescDetail.administration;
    checkDetail.dosage = prescDetail.dosage;
    checkDetail.dosage_unit = prescDetail.dosage_units;
    checkDetail.freq_count = prescDetail.frequency;
    checkDetail.freq_interval = prescDetail.freq_interval;
    checkDetail.freq_interval_unit = prescDetail.freq_interval_unit;
    checkDetail.start_day = prescDetail.start_day;
    checkDetail.end_day = prescDetail.end_day;
    checkDetail.course = prescDetail.course;
    checkDetail.pkg_count = prescDetail.pkg_count;
    checkDetail.pkg_unit = prescDetail.pkg_unit;
    checkDetail.pres_seq_id = prescDetail.pres_seq_id;
    checkDetail.patient_pres_id = prescDetail.patient_pres_id;
    checkDetail.authority_levels = prescDetail.authority_levels;
    checkDetail.alert_levels = prescDetail.alert_levels;
    checkDetail.group_id = prescDetail.group_id;
    checkDetail.bak_01 = prescDetail.bak_01;
    checkDetail.bak_02 = prescDetail.bak_02;
    checkDetail.bak_03 = prescDetail.bak_03;
    checkDetail.bak_04 = prescDetail.bak_04;
    checkDetail.bak_05 = prescDetail.bak_05;
    checkDetail.perform_schedule = prescDetail.perform_schedule;
    checkDetail.time = prescDetail.time;
}

/**
 * ���ø�Ԥ��Ϣ�����ݣ�����ҩ֮��ͨ�š���δ����case_type_pharmacist��ֵ��
 * @return {{}}
 */
function setInterventionInfo() {
    var interventionInfo = {};
    interventionInfo.doctor_id = doctor.userID;
    interventionInfo.doctor_name = doctor.doctorName;
    interventionInfo.pharmacist_id = user.userID;
    interventionInfo.pharmacist_name = user.userName;
    interventionInfo.pharmacist_phone = user.phone;
    interventionInfo.patient_id = patient.pratientID;
    interventionInfo.patient_name = patient.pratientName;
    interventionInfo.pres_id = $("#prescNo").val();

    //ע�⣡����
    interventionInfo.case_description = $("#engineCaseDescription").val();
    interventionInfo.case_type_engin = $("#engineCaseType").val();
    return interventionInfo;
}

function setCheckInterMaster(interveneAfter) {
    var checkInterMaster = {};
    checkInterMaster.doctor_id = doctor.userID;
    checkInterMaster.doctor_name = doctor.doctorName;
    checkInterMaster.dept_id = doctor.doctorDeptCode;
    checkInterMaster.dept_name = doctor.doctorDeptName;
    checkInterMaster.pharmacist_id = user.userID;
    checkInterMaster.pharmacist_name = user.userName;
    checkInterMaster.pharmacist_phone = user.phone;
    checkInterMaster.patient_id = patient.pratientID;
    checkInterMaster.patient_name = patient.pratientName;
    checkInterMaster.pres_date = $("#presc_date").val();
    checkInterMaster.visit_id = patient.visitID;
    checkInterMaster.pres_id = $("#prescNo").val();
    checkInterMaster.inter_state = 0;
    checkInterMaster.patient_tip = $("#patient_tip").val();

    checkInterMaster.inpatient_no = patient.inpatient_no;
    checkInterMaster.ward_code = patient.ward_code;
    checkInterMaster.ward_name = patient.ward_name;
    checkInterMaster.bed_no = patient.bed_no;
    checkInterMaster.id = patient.patientPrescID;


    //  ����º�©���ĸ�Ԥ������ "isAfter" Ϊ 1
    if (interveneAfter == 1) {
        checkInterMaster.is_after = 1;
        if ("" == checkInterMaster.pharmacist_id || null == checkInterMaster.pharmacist_id || "null" == checkInterMaster.pharmacist_id) {
            checkInterMaster.pharmacist_id = $("#userIdParam").val();
            checkInterMaster.pharmacist_name = $("#userNameParam").val();
        }
    } else {
        checkInterMaster.is_after = 0;
    }

    return checkInterMaster;
}

function showErrorDetail(orderNo, obj) {
    $(".output").css("top", (obj.getBoundingClientRect().top + document.body.scrollTop) + "px");
    $(".output").hide();
    var a = "#prescDetail" + orderNo.replace(/\./g, "\\.").replace(/\#/g, "\\#");
    $(a).show();
}

function showError(orderNo, obj) {
    // $(".output").css("top", (obj.getBoundingClientRect().top + document.body.scrollTop) + "px");
    // $(".output").hide();
    var a = ".errorDetail" + orderNo.replace(/\./g, "\\.").replace(/\#/g, "\\#");
    $(obj).parent().parent().nextAll(a).toggle();
}

/*
 ���ظ�Ԥ��Ϣ
 2017-12-23
 ���Ӳ������Ƿ���ʾ��Ԥ��Ϣ����ҳ��
 */
function addIntervention(displayPharmInterProblem, softPass) {
    if (displayPharmInterProblem == undefined) {
        displayPharmInterProblem = '1';
    }
    if (softPass == undefined) {
        softPass = 0;
    }
    var choose_flag = 0;
    //���ԭ������
    $('#realValue').html('');

    $("input[name = 'checkbox_id']").each(function (index) {
        if ($(this).is(':checked')) {
            choose_flag = 1;
            var $tr = $(this).parent().parent();

            //ҩƷ������
            if ($tr.attr('class') == 'ordersRow') {
                //ѡ��ģ��,��дģ�壬д��
                var $template = $('#template');

                //����input radio ��name,��ֹ�ظ�
                $template.find('.defaultErrorType input[type=radio]').attr('name', 'errorTypeClass' + index);

                //���id,name
                var ordersId = $tr.find('.orderId').html().trim();
                var ordersName = $tr.find('.drugName').children().html().trim();
                $template.find('input[name="orderNo"]').val(ordersId);
                $template.find('input[name="ordersName"]').val(ordersName);

                //����id��ȡҩƷ����
                var drugProblemlist = [];
                $tr.nextAll().each(function () {
                    if ($(this).attr('class') == 'ordersRow') {
                        return false;
                    }
                    if ($(this).find('input[type=checkbox]').is(':checked')) {
                        var t = {};
                        t.drug_lo_name = $(this).find('.drug_lo_name').html().trim();
                        t.error_message = $(this).find('.error_message').html().trim();
                        t.ref_source = $(this).find('.ref_source').html().trim();
                        t.errorName = $(this).find('.error_name').html().trim();
                        t.pharErrorName = $(this).find('.phar_error_name').html().trim();
                        t.pharErrorCode = $(this).find('.phar_error_code').html().trim();
                        drugProblemlist.push(t);
                    };
                });

                //��������ģ��,ȥ�����У��س��Ϳո�
                var temDes = $template.find('.temDes').html().replace(/\ +/g, "").replace(/[ ]/g, "").replace(/[\r\n]/g, "");

                //ȥ��д��ҩƷ����,д����������
                var errorNames = new Set();
                var pharmErrorNames = new Set();
                var pharmErrorCodes = new Set();
                var errorDes = [];

                drugProblemlist.forEach(function (value) {
                    errorNames.add(value.errorName);
                    pharmErrorNames.add(value.pharErrorName);
                    pharmErrorCodes.add(value.pharErrorCode);
                    errorDes.push(
                        temDes
                            .replace('@remark', value.error_message.trim() + '\n')
                            .replace('@resource', value.ref_source.trim() + '\n')
                    )
                })

                $template.find('.case_type input').val('');
                errorNames.forEach(function (item) {
                    $template.find('.case_type input').val($template.find('.case_type input').val() + item.toString() + ",");
                });

                if (displayPharmInterProblem == '0') {
                    pharmErrorNames.forEach(function (item) {
                        $template.find('.case_type_phar textarea').val($template.find('.case_type_phar textarea').val() + item.toString() + ",");
                    });
                    pharmErrorCodes.forEach(function (item) {
                        $template.find('.case_type_phar_code textarea').val($template.find('.case_type_phar_code textarea').val() + item.toString() + ",");
                    });
                }

                errorDes.forEach(function (item) {
                    $template.find('.case_description textarea').val($template.find('.case_description textarea').val() + item.toString());
                })

                var templateHtml = $template.html();
                $('#realValue').append($template.children());
                $('#template').html(templateHtml);
            }

        }
    });

    if (choose_flag == 0) {
        alert('��ѡ��ҩƷ');
        return;
    }

    //��д������ʾ��Ϣ
    addPatientTip();

    if (displayPharmInterProblem == '0' || softPass == '1') {
        saveInterveneInfo(softPass);
    } else {
        $("#interveneInfo").show();
    }
}

function addPatientTip() {
    $("#patient_tip").val(patient.pratientName + ",����! \n" +
        "���Ĵ���������������: \n" +
        $("#engineCaseType").val() +
        " \nҩʦ��ҽ���������飬�����Ե�Ƭ�̣�");
}

//д����������
function addOrdersError(ordersNo, case_type) {
    var list = mapJSON[ordersNo];
    ordersNo = ordersNo.replace(/\./g, "\\.").replace(/\#/g, "\\#");
    var case_description = $("#case_description" + ordersNo).val();

    //���浱ǰҩƷ�����⣬ȥ��
    var thisCase_type = new Array();

    if (list == null) {
        var errorDrug = "������ҩƷ�� " + $("#" + ordersNo).parent().parent().find("td").eq(1).children().html().trim();
        case_description += (errorDrug + "\n  ����ʾ��Ϣ�� \n ���ο����ϡ� \n " );
        $("#case_description" + ordersNo).val(case_description);
        $("#engineCaseDescription").val($("#engineCaseDescription").val() + case_description);
        return;
    }
    for (var i = 0; i < list.length; i++) {
        var output = list[i];
        var flag = 0;
        for (var j = 0; j < case_type.length; j++) {
            if (output.errorName == case_type[j]) {
                flag = 1;
                break;
            }
        }

        var thisFlag = 0;
        for (var j = 0; j < thisCase_type.length; j++) {
            if (output.errorName == thisCase_type[j]) {
                thisFlag = 1;
                break;
            }
        }

        if (flag == 0) case_type.push(output.errorName);
        if (thisFlag == 0) thisCase_type.push(output.errorName);

        //ƴ����������������
        var errorDrug = "������ҩƷ�� " + $("#" + ordersNo).parent().parent().find("td").eq(1).children().html().trim();
        var errorMessage = "����ʾ��Ϣ�� " + output.error_message;
        var ref_source = "���ο����ϡ� " + output.ref_source;
        // case_description += "\n";
        case_description += (output.errorName + "\n");
        case_description += (errorDrug + "\n");
        case_description += (errorMessage + "\n");
        case_description += (ref_source + "\n");
        case_description += "\n";
    }

    $("#case_description" + ordersNo).val(case_description);
    $("#engineCaseDescription").val($("#engineCaseDescription").val() + case_description);

    //Ϊÿ����������д������,ȥ��.
    var case_typeString = "";
    if (case_type != null) {
        for (var i = 0; i < case_type.length; i++) {
            case_typeString += (case_type[i] + ";");
        }
    }

    var thisCase_typeString = "";
    if (thisCase_type != null) {
        for (var i = 0; i < thisCase_type.length; i++) {
            thisCase_typeString += (thisCase_type[i] + ";");
        }
    }

    $("#case_type" + ordersNo).val(thisCase_typeString);
    $("#engineCaseType").val(case_typeString);
    return;
}

/**
 * Ϊÿ��ҩƷ���ظ�Ԥ��Ϣ��ʽ��
 * @param order
 * @param s
 */
function addDetailInfo(order, s) {

    var ordertd = $("#" + order.replace(/\./g, "\\.").replace(/\#/g, "\\#")).parent().parent().children().eq(1);
    var name = ordertd.children().html();
    var sc = "";
    sc += '<div style="margin-top: 10px;overflow:hidden;border-bottom: 1px solid black;">';
    sc += '<div style="text-align: center"><label><h4>' + name + '�ĸ�Ԥ��Ϣ</h4></label></div>'
    sc += '<div class="errorType" style="float: left;width: 50%;">';
    sc += '<div><div class="defaultErrorType">';
    for (var j = 0; j < errorType.length; j++) {
        var typeName = errorType[j];
        sc += ('<div><input type="radio" value="' + typeName +
            '"  name="errorTypeClass' + order + '" style="margin-left: 10px;margin-bottom: 8px;"/>' + typeName + '</div>');
    }
    sc += ('</div></div></div>');

    sc += ('<div class="errorDescription" style="float: right;width: 50%;overflow: hidden">' );
    sc += '<div style="margin-top: 10px">';
    sc += '<label class="searchBarInterval">����������:';
    sc += '<input type="text" name="case_type" id="case_type' + order + '" disabled="true" style="width:49%" />';
    sc += '</label></div>';
    sc += ('<div style="margin-top: 10px">' +
        '<label class="searchBarInterval">��������:');
    sc += ('<textarea  name="case_description" id="case_description' + order + '" style="height: 250px;width: 90%"  ></textarea>' +
        '</label></div></div></div></div>');
    // sc += ('<div style="margin-top: 10px;clear: both">' +
    // '<label class="searchBarInterval">??????:</label>');
    // sc += ('<textarea name="modifyAdvice" style="height: 150px;width: 90%;margin-bottom: 15px;"  ></textarea>' +
    // '');

    s.append(sc);
}

function DoOnchange() {
    document.getElementById("mainForm").submit();
}

function test() {
    AjaxInterface.test(function () {
    });
}

function cancel() {
    AjaxInterface.cancel(function () {
    });
}

function getSelectedCheckboxValues(elementName) {
    var allCheckboxList = document.getElementsByName(elementName);
    var values = "";
    var cnt = 0;

    for (var i = 0; i < allCheckboxList.length; i++) {
        var checkbox = allCheckboxList[i];
        if (checkbox.checked) {
            cnt++;
            if (cnt == 1) {
                values = checkbox.value;
            } else {
//                values += "," + checkbox.value;
                values += checkbox.value;
            }
        }
    }

    return {
        cnt: cnt,
        values: values
    };
}

function changeInterState() {
    var allCheckboxList = document.getElementsByName("interStateChange");
    var state = 0;
    var tag = $("#tag").val();
    for (var i = 0; i < allCheckboxList.length; i++) {
        var checkbox = allCheckboxList[i];
        if (checkbox.checked) {
            state = checkbox.value;
        }
    }
    var patientId = patient.pratientID;
    var visitId = patient.visitID;
    var pres_id = $("#prescNo").val();
    var doctorId = doctor.userID;
    var phaId = $("#pharId").val();

    AjaxInterface.changeState(patientId, visitId, pres_id, doctorId, phaId, state, tag, function (blMessage) {
        if (blMessage.success) {
//            alert("�ɹ����¸�Ԥ״̬");
            $("#btn").click();
            document.location.reload();
        } else {
            alert(blMessage.message);
        }
    });
}


/**
 * ���ø�Ԥ�����Ĺ�ͬ��Ϣ������ҽ�������ߣ������Ϣ������checkInterventionDetail��
 * @return {{}}
 */
function setCheckInterventionDetail() {
    var checkInterventionDetail = {};
    checkInterventionDetail.patient_id = patient.pratientID;
    checkInterventionDetail.patient_name = patient.pratientName;
    checkInterventionDetail.gender = patient.pratientSex;
    checkInterventionDetail.birth = patient.pratientBirthday;
    checkInterventionDetail.weight = patient.pratientWeight;
    checkInterventionDetail.height = patient.pratientHeight;
    checkInterventionDetail.alergy_drugs = patient.alergyDrugs;
    checkInterventionDetail.pregnant = patient.pregnant;
    checkInterventionDetail.lact = patient.lactation;
    checkInterventionDetail.hepatical = patient.hepatical;
    checkInterventionDetail.renal = patient.renal;
    checkInterventionDetail.pancreas = patient.pancreas;
    checkInterventionDetail.visit_id = patient.visitID;
    checkInterventionDetail.identity_type = patient.identity_type;
    checkInterventionDetail.fee_type = patient.fee_type;
    checkInterventionDetail.dept_code = doctor.doctorDeptCode;
    checkInterventionDetail.dept_name = doctor.doctorDeptName;
    checkInterventionDetail.doctor_id = doctor.userID;
    checkInterventionDetail.doctor_name = doctor.doctorName;
    checkInterventionDetail.doctor_title = doctor.doctorPosition;
    checkInterventionDetail.diagnosises = diagnosises;
    return checkInterventionDetail;
}

/*********************    ������״̬�����ŵ�listҳ���� *****************/
function showPrescIntering() {
    var patient_id = $("#patient_idText").val();
    if ("" == patient_id) {
        alert("�����뻼��ID");
        return;
    }
    var inter_state = $("#inter_state").val();
    var inHospital = $("#tag").val();
    AjaxInterface.showPrescIntering(patient_id, inter_state, inHospital, function (blMessage) {
        if (blMessage.success) {
            var prescIntering = $("#prescIntering").html("");
            var dataList = blMessage.data;
            var s = "";
            if (dataList == null) {
                alert("����δ֪����");
                return;
            }
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                var condition = "";
                condition = ("'" + data.pres_id + "','" + data.patient_id + "','" + data.visit_id) + "'";
                s += '<tr><td>';
                s += ('<a onclick="showUpdateDiv(' + condition + ')">' + data.patient_id + '</a>');
                s += '</td><td>';
                s += data.patient_name;
                s += '</td><td>'
                s += data.apply_time;
                s += '</td></tr>'
            }
            prescIntering.append(s);
            $("#interingTable").show();
        } else {
            alert(blMessage.message);
            return;
        }
    })
}

function showPresc() {
    var inHospital = $("tag").val();
    var patient_id = '';
    var inter_state = $("#inter_state").val();
    AjaxInterface.showPrescIntering(patient_id, inter_state, inHospital, function (blMessage) {
        if (blMessage.success) {
            var prescIntering = $("#prescIntering").html("");
            var dataList = blMessage.data;
            var s = "";
            if (dataList == null) {
                alert("����δ֪����");
                return;
            }
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                var condition = "";
                condition = ("'" + data.pres_id + "','" + data.patient_id + "','" + data.visit_id) + "'";
                s += '<tr><td>';
                s += ('<a onclick="showUpdateDiv(' + condition + ')">' + data.patient_id + '</a>');
                s += '</td><td>';
                s += data.patient_name;
                s += '</td><td>'
                s += data.apply_time;
                s += '</td></tr>'
            }
            prescIntering.append(s);
            $("#interingTable").show();
        } else {
            alert(blMessage.message);
            return;
        }
    })
}

function showUpdateDiv() {
    var interState = $("#inter_state").val();
    var inHospital = $("#tag").val();
    AjaxInterface.showUpdateDiv(spres_id, spatient_id, spres_date, interState, inHospital, function (blMessage) {
        if (blMessage.success) {
            var dataList = blMessage.data;
            if (dataList == null || dataList.length == 0) {
                throw "û����ش���";
            }
            var data = dataList[0];
            $("#patientID").html(data.patient_id);
            $("#patientName").html(data.patient_name);
            $("#doctorName").html(data.doctor_name);
            $("#prescId").html(data.pres_id);
            $("#phaName").html(data.pharmacist_name);
            $("#doctor_id").val(data.doctor_id);
            $("#phaId").val(data.pharmacist_id);
            $("#visit_Id").val(data.visit_id);

            if (data.inter_state == 0)
                $("#interStateZero").attr("checked", 'checked');
            if (data.inter_state == 1)
                $("#interStateOne").attr("checked", 'checked');
            if (data.inter_state == 2)
                $("#interStateTwo").attr("checked", 'checked');

            $("#modal-431558s").click();
        } else {
            alert(blMessage.message);
        }
    })
}

function agreeDoctor() {
    $("#inputText").val("ͬ��ҽʦ�۵�");
    $("#sendMessageButton").click();
    $("#inputText").val("������һ��");
    $("#sendMessageButton").click();
//    changeInterStateList('4');
}

function changeInterStateList(state) {
    var allCheckboxList = document.getElementsByName("interStateChange");
    var tag = $("#tag").val();
    var patientId = $("#patientID").html();
    var visitId = $("#visit_Id").val();
    var pres_id = $("#prescId").html();
    var doctorId = $("#doctor_id").val();
    var phaId = $("#pharId").val();

    if (state == 1) {
        $("ul").find('li:last').prevAll('.chat-threadLeft').each(function () {
            if ($(this).html().trim() == 'ͬ��ҽʦ�۵�') {
                state = 4;
                return false;
            }
        })

    }

    AjaxInterface.changeState(spatient_id, visitId, spres_id, doctorId, phaId, state, tag, spres_date, function (blMessage) {
        if (blMessage.success) {
//            alert("�ɹ����¸�Ԥ״̬");
            $("#btn").click();
            document.location.reload();
        } else {
            alert(blMessage.message);
        }
    });
}

function changeInterStateValue(obj, state) {
    $("a").removeClass("stateBg");
    $("li").removeClass("active");
    $("#inter_state").val(state);
    obj.className = 'stateBg';
}

function beginTimeCount() {
//    setTimeout("timedCount()",1000);

    //�Ự�ĵ�һ����ѯ��ʶ
    if (!sessionStorage.talkListFirstFlag)
        sessionStorage.talkListFirstFlag = 1;
    timedCount();

}

function timedCount() {
    var autoRefresh;
    if (!sessionStorage.getItem("autofreshFlag") || sessionStorage.autofreshFlag == 0) {
        autoRefresh = "0";
    } else {
        autoRefresh = "1";
    }
    var inHospital = $("#tag").val();
    AjaxInterface.checkMessage(userId, inHospital, autoRefresh, function (blMessage) {
        //  ��վ��½sessionʧЧ
        if (blMessage.data == "ERROR.LOGIN.INVALID") {
            notifyMe('����֪ͨ', blMessage.message, '',blMessage.tempList);
            window.location.href = "/index.jsp";
            return;
        }
        if (blMessage.data == "2") {
            window.close();
            alert("���ѱ�ǿ���뿪��ҳ��");
            return ;
        }

        //ajax����־
        AjaxInterface.testReturnMessages(userId, inHospital,blMessage.tempList, function (blMessage) {
        })

        // ����ˢ�±�ʶȷ���Ƿ�ˢ��ҳ�棻
        if (blMessage.message == 'true') {
            //  �����͸��Ӵ���
            myNotifyMe(blMessage.tempList);

            //  ˢ��ǰ����Щ�����Ǳ�ѡ�е�
            var checkedBox = new Set();
            $("#dataTable tbody tr").each(function () {
                if ($(this).find('input[type=checkbox]').is(':checked')) {
                    checkedBox.add($(this).find(".pres_id").html().trim());
                }
            })

            $('#dataTable tbody').html('');
            if (blMessage.tempList != null) {
                var dataList = blMessage.tempList;
                var data;
                var color = "";
                var warm = "";
                var warmLevel = 0;
                for (var i = 0; i < dataList.length; i++) {
                    data = dataList[i];
                    var temp = "";
                    warmLevel = data.warning_level;
                    switch (warmLevel) {
                        case 0:
                            color = '#ffffff';
                            warm = 'û������';
                            break;
                        case 1:
                            color = '#ffff00';
                            warm = '����';
                            break;
                        case 2:
                            color = '#ff0000';
                            warm = '����';
                            break;
                        case -1:
                            color = '#ff0000';
                            warm = '����';
                            break;
                        default:
                            color = '#ffffff';
                            warm = 'û������';
                    }

                    temp += ('<tr id="record' + data.id + '">' )
                    temp += ('<td align="center"style="width: 5%;vertical-align: middle;"><input class="intervene_checkbox" type="checkbox" value="' + data.id + '" id="id1" name="checkbox_id"></td>');
                    temp += ('<td align="center" style="width: 10%;vertical-align: middle;">\n' +
                        '                            <input style="float: left;margin-left: 5px;" type="button" value="��ҩ" onclick="quickPass(this)"/>\n' +
                        '                            <input style="float: right;margin-right: 5px;" type="button" value="��Ԥ" onclick="quickIntervene(this, \''+data.presc_id+'\', \''+data.id+'\')"/>\n' +
                        '                        </td>');

                    temp += ('<td align="center"style="width: 10%;vertical-align: middle;"><a onclick="intervene_new(\'' + data.id + '\',\'PrescEvaluate\',this,undefined,undefined,1,0,0,\'' + data.presc_id + '\', 1)">' + data.patient_id
                        + '</a></td>');

                    temp += ('<td align="center"style="width: 10%;vertical-align: middle;">' + data.pres_date + '</td>');
                    temp += ('<td align="center" style="display:none" class="pres_id">' + data.presc_id + '</td>');
                    temp += ('<td align="center"style="width: 5%;vertical-align: middle;">' + data.errorNumber + '</td>');
                    temp += ('<td align="center"style="width: 5%;vertical-align: middle;">' + data.dept_name + '</td>');
                    temp += ('<td align="center" style="background-color:' + color + ';width: 5%;vertical-align: middle;">' + warm + '</td>');
                    temp += ('<td align="center"style="width: 10%;vertical-align: middle;">' + data.problemDrugs + '</td>');
                    temp += ('<td align="center"style="width: 10%;vertical-align: middle;">' + data.problemTypes + '</td>');
                    temp += ('<td align="center"style="width: 40%;vertical-align: middle;">' + data.warningInfos + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.drugCount + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.groupCount + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.patient_name + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.tPrescInputXML.patient.inpatient_no + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.doctor_code + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.doctor_name + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.dept_code + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.dept_name + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.id + '</td>');
                    temp += ('<td align="center"style="display: none;vertical-align: middle;">' + data.visitId + '</td></tr>');

                    $('#dataTable tbody').append(temp);
                }
            }

            $("#dataTable tbody tr").each(function () {
                var preId = $(this).find(".pres_id").html().trim();
                if (checkedBox.has(preId)) {
                    $(this).find('input[type=checkbox]').attr('checked', true);
                }
            })
        }

        var prescIntering = $("#prescIntering").html("");
        var dataList = blMessage.data;
        var s = "";
        if (dataList == null) {
            return;
        }
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            var condition = "";
            var id = (data.presc_id + data.patient_id + data.pres_date_short).replace(/\s+/g, "").replace(new RegExp(/(:)/g), "");

            //�ж��ǲ��ǻỰ�е�һ�β�ѯ����һ�εĻ�������c_max_message_no��ֵ
            if (sessionStorage.talkListFirstFlag == 1) {
                sessionStorage.setItem("maxNoD" + id, 0);
                sessionStorage.talkListFirstFlag = 0;
            }
            var maxNo = sessionStorage.getItem("maxNoD" + id);
            //ƴ��condition
            condition = ("'" + data.presc_id + "','" + data.patient_id + "','" + data.pres_date_short + "','" );
            condition += ( maxNo + "'" );

            if (maxNo < data.max_message_no) {
                // �����ѯ���µ���Ϣ
                // checkNewMessages(data.presc_id, data.patient_id, data.pres_date_short);
                s += '<tr style="background-color:yellow"><td>';
            } else {
                s += '<tr><td>';
            }
            if (maxNo < data.max_message_no) {
                s += ('<a style="color:red" onclick="t(' + condition + ',this)">' + data.patient_id + '</a>')
            } else {
                s += ('<a onclick="t(' + condition + ',this)">' + data.patient_id + '</a>')
            }
            s += '</td><td style="display: none">';
            s += data.presc_id;
            s += '</td><td style="display:none">'
            s += data.completeDate;
            s += '</td><td>'
            s += data.doctor_name;
            s += '</td><td>'
            s += data.dept_name;
            s += '</td><td><a onclick="showDeleteDialog(' + condition + ')" style="color:red">ɾ��';
            s += '</a></td><td style="display:none">'
            s += data.id;
            s += '</td></tr>';
        }
        prescIntering.append(s);
    })
    setTimeout("timedCount()", refreshTimeList);
}

function showDeleteDialog(pres_id, patient_id, pres_date, max_message_no) {
    var sure = confirm("ȷ��ɾ����");
    if (sure) {
        spres_id = pres_id;
        spatient_id = patient_id;
        spres_date = pres_date;
        changeInterStateList(2);
    }
}

// �������Ϣ��Ŀ������ƥ�䵽'��ӡ����'�Լ�'�޸Ĵ���'ʱ���ܹ��Զ���������Ԥ��Ϣ���б����Ƴ���
function checkNewMessages(pres_id, patient_id, pres_date) {
    var inHospital = $("#tag").val();
    spres_id = pres_id;
    spatient_id = patient_id;
    spres_date = pres_date;

    AjaxInterface.findNewMessages(patient_id, pres_id, pres_date, inHospital, function (blMessage) {
        if (blMessage.success) {
            var dataList = blMessage.data;
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                if (data.message_text == '��ӡ����') {
                    changeInterStateList(1);
                } else if (data.message_text == '�޸Ĵ���') {
                    changeInterStateList(2);
                }
            }
        }
    })
}


var spres_id;
var spatient_id;
var spres_date;
var confirmFlag = 0;

function t(pres_id, patient_id, pres_date, max_message_no, obj) {
    var inHospital = $("#tag").val();
    spres_id = pres_id;
    spatient_id = patient_id;
    spres_date = pres_date;

    var inputId = $(obj).parent().parent().children().eq(6).html();
    $('#viewDetail').attr("onclick", 'intervene_new("' + inputId + '","PrescEvaluate",this,1,undefined,1,0,0,"' + pres_id + '", 1)');
    var id = spres_id + spatient_id + spres_date;
    id = id.replace(/\s+/g, "").replace(new RegExp(/(:)/g), "");
    //��һ�λỰ�У���һ�ε㿪�Ի����ʱ��ͨ��P���������жϣ����ӷ�����ȡ�����¼������
    // ȡ��������Ϣ����ʾ��Ȼ��ʼ��ѯ���ӱ���ȡ�����¼��
    if (!sessionStorage.getItem("maxNoP" + id)) {
        AjaxInterface.findNewMessages(patient_id, pres_id, pres_date, inHospital, function (blMessage) {
            if (blMessage.success) {
                var tempContext = "";
                tempContext += ("<div id='" + id + "' class='text_style'>");
                tempContext += ("<ul class='chat-thread'>");
                var tempPMaxNo = 0;
                var tempDMaxNo = 0;
//                var tempDMaxNo = sessionStorage.getItem("maxNoD"+id);
                var data = blMessage.data;
                for (var i = 0; i < data.length; i++) {
                    var aData = data[i];

                    if (aData.tablename == "P") {
                        tempContext += "<li class='chat-threadLeft'>";
                        if (aData.message_no > tempPMaxNo) {
                            tempPMaxNo = aData.message_no;
                        }
                    } else {
                        tempContext += "<li class='chat-threadRight'>";
                        if (aData.message_no > tempDMaxNo) {
                            tempDMaxNo = aData.message_no;
                        }
                    }
                    //�����ַ������жϣ���ʾ�Զ�����״̬
                    //����˫ǩ�ַ�ҩ
                    if (aData.message_text == '����˫ǩ�ַ�ҩ') {
                        tempContext += 'ҽ������˫ǩ�ַ�ҩ';
                        if (1 == $("#confirmLink").val()) {
                            tempContext += '\n' + '<input type="button" style="margin-right: 16px;background: #028E02; border:none; border-radius:4px; width:50px; color:white;" value="ͬ��" onclick="confirmDeliver(0, this)" />';
                            tempContext += '<input type="button" style="background: #ff4949; border:none; border-radius:4px; width:50px; color:white;" value="��ͬ��" onclick="confirmDeliver(1, this)" />';
                        } else {
                            //1s֮�󵯳��Ի���
                            if (confirmFlag == 0) {
                                confirmFlag = 1;
                                setTimeout(function () {
                                    if (window.confirm('ҽ������˫ǩ�ַ�ҩ,�Ƿ�ͬ��˫ǩ�ַ�ҩ��')) {
                                        agreeDeliverDrug(0);
                                        confirmFlag = 0;
                                    } else {
                                        agreeDeliverDrug(1);
                                        confirmFlag = 0;
                                    }

                                }, "1000");
                            }
                        }
                    } else if (aData.message_text == '��ӡ����') {
                        changeInterStateList(1);
                        tempContext += '<a style="cursor: pointer;" onclick="changeInterStateList(1)">ҽ��ѡ���ӡ����������˴����¸�Ԥ״̬</a>';
                    } else if (aData.message_text == '�޸Ĵ���') {
                        changeInterStateList(2);
                        tempContext += '<a style="cursor: pointer;" onclick="changeInterStateList(2)">ҽ��ͬ���޸Ĵ���������˴����¸�Ԥ״̬</a>';
                    } else {
                        tempContext += aData.message_text;
                    }
                    tempContext += "</li>";
                }
                tempContext += ("</ul></div>");
                sessionStorage.setItem("talkHistory" + id, tempContext);
                sessionStorage.setItem("maxNoP" + id, tempPMaxNo);
                sessionStorage.setItem("maxNoD" + id, tempDMaxNo);

                //��ʾ�Ի�������
                var talkHis = sessionStorage.getItem("talkHistory" + id);
                $("#text").html(talkHis);
                // $("#modal-431558s").click();
                $("#modal-container-431558").modal('show');
                // $("#" + id + " > ul").scrollTop(200000);
            }
            beginTalk();
        })
    } else {
        //��ʾ�Ի�������
        var talkHis = sessionStorage.getItem("talkHistory" + id);
        $("#text").html(talkHis);
        // $("#modal-431558s").click();
        $("#modal-container-431558").modal('show');
        beginTalk();
    }
}

function agreeDeliverDrug(flag) {
    if (flag == 0) {
        $("#inputText").val("ͬ��˫ǩ�ַ�ҩ");
        $("#sendMessageButton").click();
        $("#inputText").val("������һ��");
        $("#sendMessageButton").click();
    } else {
        $("#inputText").val("��ͬ��˫ǩ�ַ�ҩ���뷵���޸�");
        $("#sendMessageButton").click();
    }
    // $('input[nam = "deliverDrug"]').readOnly();
}

var item;
function beginTalk() {
    var inHospital = $("#tag").val();
    var id = (spres_id + spatient_id + spres_date).replace(/\s+/g, "").replace(new RegExp(/(:)/g), "");
    var max_message_no = sessionStorage.getItem("maxNoD" + id);

    //����DNO��ѯ����ѯ�����ݴ��浽 sessionStorage �У���#textƴ���ַ�����ƴ�Ӻõ��ַ����ٴ洢�� sessionStorage �С�
    AjaxInterface.beginTalk(spres_id, spatient_id, spres_date, max_message_no, inHospital, function (blMessage) {
        if (blMessage.success) {
            var length = blMessage.data.length;
            if (length > 0) {
                var talkHis = sessionStorage.getItem("talkHistory" + id);
                $("#text").html(talkHis);
                var tempContext = "";
                var data = blMessage.data;
                for (var i = 0; i < data.length; i++) {
                    var aData = data[i];
                    tempContext += "<li class='chat-threadRight'>";
                    if (aData.message_text == '����˫ǩ�ַ�ҩ') {
                        tempContext += 'ҽ������˫ǩ�ַ�ҩ';
                        if (1 == $("#confirmLink").val()) {
                            tempContext += '\n' + '<input type="button" style="margin-right: 16px;background: #028E02; border:none; border-radius:4px; width:50px; color:white;" value="ͬ��" onclick="confirmDeliver(0, this)" />';
                            tempContext += '<input type="button" style="background: #ff4949; border:none; border-radius:4px; width:50px; color:white;" value="��ͬ��" onclick="confirmDeliver(1, this)" />';
                        } else {
                            //1s֮�󵯳��Ի���
                            if (confirmFlag == 0) {
                                confirmFlag = 1;
                                setTimeout(function () {
                                    if (window.confirm('ҽ������˫ǩ�ַ�ҩ,�Ƿ�ͬ��˫ǩ�ַ�ҩ��')) {
                                        agreeDeliverDrug(0);
                                        confirmFlag = 0;
                                    } else {
                                        agreeDeliverDrug(1);
                                        confirmFlag = 0;
                                    }
                                }, "1000");
                            }
                        }
                    } else if (aData.message_text == '��ӡ����') {
                        changeInterStateList(1);
                        tempContext += '<a style="cursor: pointer;" onclick="changeInterStateList(1)">ҽ��ѡ���ӡ����������˴����¸�Ԥ״̬</a>';
                    } else if (aData.message_text == '�޸Ĵ���') {
                        changeInterStateList(2);
                        tempContext += '<a style="cursor: pointer;" onclick="changeInterStateList(2)">ҽ��ͬ���޸Ĵ���������˴����¸�Ԥ״̬</a>';
                    } else {
                        tempContext += aData.message_text;
                    }
                    tempContext += "</li>";
                }
                $("#" + id + " > ul").append(tempContext);
                $("#" + id + " > ul").scrollTop(200000);
                sessionStorage.setItem("talkHistory" + id, $("#text").html());
                sessionStorage.setItem("maxNoD" + id, blMessage.data[length - 1].message_no);
            }
        }
        item = setTimeout("beginTalk()", refreshTimeDetail);
    });
}

//  ͨ������ȷ��ͬ�����
function confirmDeliver(state, button) {
    if (0 == state) {
        $(button).next().remove();
    } else {
        $(button).prev().remove();
    }
    button.remove();
    agreeDeliverDrug(state);
}

function addContext(id, data) {
    var tempContext = "";
    for (var i = 0; i < data.length; i++) {
        var aData = data[i];
        tempContext += "<li class='chat-threadLeft'>";
        tempContext += aData.message_text;
        tempContext += "</li>";
    }
    $("#" + id + " > ul").append(tempContext);
    saveToSessionStorage('context', $(".context").html());
}

function createContext(id, data) {
//    var context = $(".context").html();
    var tempContext = "";
    tempContext += ("<div id=" + id + ">");
    tempContext += ("<ul class='chat-thread'>");
    for (var i = 0; i < data.length; i++) {
        var aData = data[i];
        tempContext += "<li class='chat-threadRight'>";
        tempContext += aData.message_text;
        tempContext += "</li>";
    }
    tempContext += ("</ul></div>");

    //���ı����ݷŵ�sessionStorage ��
    $(".context").append(tempContext);
    saveToSessionStorage(id, $(".context").html());
}

function sendMessage() {
    var inHospital = $("#tag").val();
    var inputText = $("#inputText").val().trim();
    if (inputText == "") {
        $("#inputText").val('');
        return;
    }
    var id = (spres_id + spatient_id + spres_date).replace(/\s+/g, "").replace(new RegExp(/(:)/g), "");
    var tempContext = ("<li class='chat-threadLeft'>" + inputText + "</li>");
    $("#" + id + " > ul").append(tempContext);

    //�����Ϣ
    $("#inputText").val("");
    //������Ϣ
    var pMessageMaxNo = Number(sessionStorage.getItem("maxNoP" + id)) + 1;
    sessionStorage.setItem("maxNoP" + id, pMessageMaxNo);
    //���������¼������
    sessionStorage.setItem("talkHistory" + id, $("#text").html());
    $("#" + id + " > ul").scrollTop(200000);
    AjaxInterface.savePMessage(spatient_id, spres_id, spres_date, inputText, pMessageMaxNo, inHospital);
}

function saveToSessionStorage(context, data) {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.context = data;
    }
    else {
        alert("Sorry, your browser does not support web storage...");
    }
}

function closeBTN() {
    clearTimeout(item);
    $("#btn").click();
}

$(function () {
    $('#modal-container-431558').on('hide.bs.modal', function () {
        clearTimeout(item);
    })
});

/**
 *  �����������
 */
$(function () {
    $('#modal-container-431558').on('show.bs.modal', function () {
        var id = (spres_id + spatient_id + spres_date).replace(/\s+/g, "").replace(new RegExp(/(:)/g), "");
        $("#" + id + " > ul").scrollTop(200000);
    })
});


////�����س���
document.onkeydown = function (e) {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if (code == 13) {
        $("#sendMessageButton").click();
    }
}

function requestDrug() {
    $("#inputText").val("Ҫ��˫ǩ�ַ�ҩ");
    $("#sendMessageButton").click();
}


/**
 * ���� ����/�ر� �Զ�ˢ�¹���
 * @param userId
 * @param obj
 */
function autorefresh(userId, obj) {
    var inHospital = $("#tag").val();
    //����
    if (!sessionStorage.getItem("autofreshFlag") || sessionStorage.autofreshFlag == 0) {
        AjaxInterface.addDeptCache(userId, inHospital);
        sessionStorage.setItem("autofreshFlag", 1);
        $(obj).attr('value', '�ر��Զ�ˢ��');
    }
    //�ر�
    else {
        AjaxInterface.moveDeptCache(userId, inHospital);
        sessionStorage.setItem("autofreshFlag", 0);
        $(obj).attr('value', '�����Զ�ˢ��');
        $(obj).html("�����Զ�ˢ��");
    }
}

/**
 * �������ҩ��ť
 * ִ������ҩ����
 * @param userId
 * @param userName
 */
function passToDeliverDrug(userId, userName) {
    var inputTempList = new Array();
    inputXMLJson.patient_name= patient.pratientName;
    inputXMLJson.inpatient_no= patient.inpatient_no;
    inputXMLJson.doctor_code = doctor.userID;
    inputXMLJson.doctor_name = doctor.doctorName;
    inputXMLJson.dept_code = doctor.doctorDeptCode;
    inputXMLJson.dept_name = doctor.doctorDeptName;
    inputXMLJson.id = patient.patientPrescID;
    inputXMLJson.visitId = patient.visitID;

    inputTempList.push(inputXMLJson);
    AjaxInterface.sighToView($("#id").val(), $('#tag').val(), inputTempList, userId, userName, function (blMessage) {
        if (blMessage.success) {
            window.opener.location.href = window.opener.location.href;
            window.close();
        }
    });
}

function missedPrescCheckPass(userId, userName) {
    var inHospital = $("#tag").val();
    if (!confirm("ȷ����˸ô���û��������"))
        return;
    var prescIdsTemp = $("#prescIdsTemp").val();
    AjaxInterface.missedPrescCheckPass(prescIdsTemp, userId, userName, inHospital, function (blMessage){
        if (blMessage.success) {
            alert("����ɹ�!");
            window.opener.location.href = window.opener.location.href;
            window.close();
        } else {
            alert("����ԭ�������ԣ�");
        }
    })
}

/**
 * ����ҳ���ʼ��
 * 1. ���ø�Ԥ����
 * @param userId
 */
function initDept(userId) {
    var inHospital = $("#tag").val();
    AjaxInterface.getChooseDept(userId, inHospital, function (blMessage) {

        setDeptIntoChart($("#timeMenu tbody"), $("#bigMenu tbody"), blMessage.data.recordList, blMessage.data.chooseDeptCode, blMessage.data.branchNameList, "")

        if (blMessage.data.chooseDeptCode == null || blMessage.data.chooseDeptCode.length == 0) {
            alert('��δ���ø�Ԥ���ң����Ƚ������ã�');
            $('#modal-dept').click();
            return;
        }

    })
}

/**
 * ����ҳ���ʼ��
 * 2. ���ø�Ԥ����
 * @param userId
 */
function initProblemLevel(userId) {
    var inHospital = $("#tag").val();
    $("input[name='problem_level_1']").prop('checked', false);
    $("input[name='problem_level_2']").prop('checked', false);
    AjaxInterface.getProblemLevel(userId, inHospital, function (blMessage) {
        var dataList = blMessage.data;
        if (dataList == null || dataList.length == 0) {
            alert('��δ���ø�Ԥ�������Ƚ������ã�');
            $('#modal-problem_level').click();
            return;
        } else {
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                $("input[name='problem_level_"+data+"']").prop('checked', true);
            }
        }
    })
}

/**
 * ����ҳ���ʼ��
 * 3. ���ø�Ԥ��������
 * @param userId
 */
function initProblemType(userId) {
    var inHospital = $("#tag").val();
    AjaxInterface.getProblemType(userId, inHospital, function (blMessage) {

        var unChosenList = blMessage.b;
        var unChosenMenu = $("#unChosenMenu tbody");
        unChosenMenu.html("");

        for (var i = 0; i < unChosenList.length; i++) {
            var data = unChosenList[i];
            unChosenMenu.append("<tr onclick='deleteProblemType(this)'><td>" + data + "</td></tr>");
        }

        var chosenList = blMessage.data;
        var chosenMenu = $("#chosenMenu tbody");
        chosenMenu.html("");

        if (chosenList == null || chosenList.length == 0) {
            alert('��δ���ø�Ԥ�������ͣ����Ƚ������ã�');
            $('#modal-problem-type').click();
            return;
        }
        for (var i = 0; i < chosenList.length; i++) {
            var data = chosenList[i];
            chosenMenu.append("<tr onclick='addProblemType(this)'><td>" + data + "</td></tr>");
        }

    })
}

function addDept(obj) {
    var deptName = $(obj).children().eq(0).html();
    var deptCode = $(obj).children().eq(1).html();
    var inputCode = $(obj).children().eq(2).html();
    var tr = "<tr onclick='deleteDept(this)'>" +
        "<td>" + deptName + "</td>" +
        "<td style='display: none'>" + deptCode + "</td>" +
        "<td style='display: none'>" + inputCode + "</td>" +
        "</tr>"
    $(obj).remove();

    var firstDeptName = $("#bigMenu tbody tr:first").find("td:first").html();
    if ("ȫ������" == firstDeptName) {
        $("#bigMenu tbody tr:first").after(tr);
    } else {
        $("#bigMenu tbody").prepend(tr);
    }

}

function chooseAllDept() {
    $('#timeMenu tbody tr').each(function () {
        addDept(this);
    })
}

function deleteDept(obj) {
    var deptName = $(obj).children().eq(0).html();
    var deptCode = $(obj).children().eq(1).html();
    var inputCode = $(obj).children().eq(2).html();
    var tr = "<tr onclick='addDept(this)'>" +
        "<td>" + deptName + "</td>" +
        "<td style='display: none'>" + deptCode + "</td>" +
        "<td style='display: none'>" + inputCode + "</td>" +
        "</tr>"
    $(obj).remove();

    var firstDeptName = $("#timeMenu tbody tr:first").find("td:first").html();
    if ("ȫ������" == firstDeptName) {
        $("#timeMenu tbody tr:first").after(tr);
    } else {
        $("#timeMenu tbody").prepend(tr);
    }

}

function deleteAllDept() {
    $('#bigMenu tbody tr').each(function () {
        deleteDept(this);
    })
}

function saveDept(userId) {
    var saveDaptList = new Array();
    $('#bigMenu tbody').children().each(function () {
        $obj = $(this);
        var temp = {};
        temp.pharmacistId = userId;
        temp.deptCode = $obj.children().eq(1).html();
        temp.deptName = $obj.children().eq(0).html();
        saveDaptList.push(temp);
    })

    var inHospital = $("#tag").val();
    AjaxInterface.saveDeptCache(saveDaptList, userId, inHospital, function (blMessage) {
        alert("�ɹ��������ã������Զ�ˢ��");
        //�����Զ�����
        sessionStorage.setItem("autofreshFlag", 1);
        $("#autorefreshbnt").attr('value', '�ر��Զ�ˢ��')
    })
}

/**
 * ����ѡ���Ԥ�������
 */

function addProblemType(obj) {
    var problemType = $(obj).children().eq(0).html();
    var tr = "<tr onclick='deleteProblemType(this)'><td>" + problemType + "</td></tr>"
    $(obj).remove();

    $('#chosenMenu tbody').html(tr + $('#chosenMenu tbody').html());
}

function chooseAllProblemType() {
    $('#unChosenMenu tbody tr').each(function () {
        addProblemType(this);
    })
}

function deleteProblemType(obj) {
    var problemType = $(obj).children().eq(0).html();
    var tr = "<tr onclick='addProblemType(this)'><td>" + problemType + "</td></tr>"
    $(obj).remove();

    $('#unChosenMenu tbody').html(tr + $('#unChosenMenu tbody').html());
}

function deleteAllProblemType() {
    $('#chosenMenu tbody tr').each(function () {
        deleteProblemType(this);
    })
}

function saveProblemType(userId, userName) {
    var problemTypeList = new Array();
    $('#chosenMenu tbody').children().each(function () {
        $obj = $(this);
        var temp = {};
        temp.pharmacistId = userId;
        temp.pharmacistName = userName;
        temp.problemType = $obj.children().eq(0).html();
        problemTypeList.push(temp);
    })

    var inHospital = $("#tag").val();
    AjaxInterface.saveProblemTypelCache(problemTypeList, userId, inHospital, function (blMessage) {
        alert("�ɹ��������ã������Զ�ˢ��");
        //�����Զ�����
        sessionStorage.setItem("autofreshFlag", 1);
        $("#autorefreshbnt").attr('value', '�ر��Զ�ˢ��')
    })
}

/**
 * 2018-05-28
 * ����ѡ��ĸ�Ԥ����
 * @param userId
 */
function saveProblemLevel(userId, userName) {
    var saveProblemLevelList = new Array();

    var problemLevel1 = $("input[name='problem_level_1']").is(':checked');
    if (problemLevel1) {
        var temp = {};
        temp.pharmacistId = userId;
        temp.pharmacistName = userName;
        temp.problemLevel = 1;
        saveProblemLevelList.push(temp);
    }
    var problemLevel2 = $("input[name='problem_level_2']").is(':checked');
    if (problemLevel2) {
        var temp = {};
        temp.pharmacistId = userId;
        temp.pharmacistName = userName;
        temp.problemLevel = 2;
        saveProblemLevelList.push(temp);
    }

    var inHospital = $("#tag").val();
    AjaxInterface.saveProblemLevelCache(saveProblemLevelList, userId, inHospital, function (blMessage) {
        alert("�ɹ��������ã������Զ�ˢ��");
        //�����Զ�����
        sessionStorage.setItem("autofreshFlag", 1);
        $("#autorefreshbnt").attr('value', '�ر��Զ�ˢ��')
    })
}

/**
 * �û�ˢ�����б�ҳ
 * @param phar
 * @param id
 */
function recoveryState(phar, id) {
    var inHospital = $("#tag").val();
    AjaxInterface.recoveryState(phar, id, inHospital)
}

/**
 * ΢������
 * @param dataList
 * @returns {*}
 */
function myNotifyMe(dataList) {
    if (dataList == null) return;
    var lastDataTime = $("input[name='lastDataTime']").val();
    if (lastDataTime == undefined) {
        if ('1' == problemPresTimeOrder) {
            var rows = $('#dataTable tbody tr').length;
            lastDataTime = $('#dataTable tbody tr').eq(rows-1).find('td').eq(3).html();
        } else {
            lastDataTime = $('#dataTable tbody tr').eq(0).find('td').eq(3).html();
        }
    }
    if (lastDataTime != undefined) {
        lastDataTime = lastDataTime.trim();
    } else
        lastDataTime = '0';

    var message;
    var color;
    var warmLevel;
    var warm;
    var img;

    var dataTemp = [];
    if (dataList.length > 0) {
        var ring = false;
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            if (data.pres_date > lastDataTime) {
                dataTemp.push(data);
                warmLevel = data.warning_level;
                switch (warmLevel) {
                    case 0:
                        color = '#ffffff';
                        warm = '��ɫ';
                        break;
                    case 1:
                        color = '#ffff00';
                        warm = '��ɫ';
                        img = 'yellow';
                        break;
                    case 2:
                        color = '#ff0000';
                        warm = '��ɫ';
                        img = 'red';
                        break;
                    case -1:
                        color = '#ff0000';
                        warm = '��ɫ';
                        img = 'red';
                        break;
                    default:
                        color = '#ffffff';
                        warm = '��ɫ';
                }

                message = "����ȼ�:" + warm;
                var iconUrl = "WebPage/intervene/resource/" + img + ".png";

                notifyMe('�����⴦��', message, iconUrl,dataList);
                ring = true;
            }
        }
        if (ring) {
            playAudio();
        }
    }

    return dataTemp;

}

/**
 * ��Ϣ����ͣ���������ʱ��
 * @type {number}
 */
var timeoutclose = 30000

function notifyMe(title, content, iconUrl,list) {
    if (!title && !content) {
        title = "��������";
        content = "������Ϣ";
    }
    if (window.webkitNotifications) {
        //chrome�ϰ汾
        if (window.webkitNotifications.checkPermission() == 0) {
            var notif = window.webkitNotifications.createNotification(iconUrl, title, content);
            notif.display = function () {
            }
            notif.onerror = function () {
            }
            notif.onclose = function () {
            }
            notif.onclick = function () {
                window.focus();
                this.cancel();
            }
            notif.onshow = function () {
                setTimeout(function () {
                    notif.close();
                }, timeoutclose)
            };
            notif.replaceId = 'Meteoric';
            notif.show();
        } else {
            window.webkitNotifications.requestPermission(notifyMe);
        }
    } else if ("Notification" in window) {
        // �ж��Ƿ���Ȩ��
        if (Notification.permission === "granted") {
            var notification = new Notification(title, {
                "icon": iconUrl,
                "body": content
            });
            notification.onclick = function () {
                //���֪ͨ��Ϣ�����,֪ͨ���ڽ�������
                window.focus();
                notification.close();
            }
            notification.onshow = function () {
                setTimeout(function () {
                    notification.close();
                }, timeoutclose)
            };

            //ajax����־
            AjaxInterface.testNotifyMeMessages(title,list,function (blMessage) {
            })
        }
        //���ûȨ�ޣ�������Ȩ��
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // Whatever the user answers, we make sure we store the
                // information
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                //�����������
                if (permission === "granted") {
                    var notification = new window.Notification(title, {
                        "icon": iconUrl,
                        "body": content
                    });
                    notification.onclick = function () {
                        //���֪ͨ��Ϣ�����,֪ͨ���ڽ�������
                        window.focus();
                        notification.close();
                    }
                    notification.onshow = function () {
                        setTimeout(function () {
                            notification.close();
                        }, timeoutclose)
                    };
                    //ajax����־
                    AjaxInterface.testNotifyMeMessages(title,list,function (blMessage) {
                    })
                }
            });
        }
    }
}

function playAudio() {
    var audio = document.getElementById('playAudio');
    //���²���
    audio.currentTime = 0;
    audio.play();
}

function checkHead(obj) {
    //��������
    $(obj).parent().parent().nextAll().each(function (index) {
            if ($(this).attr('class') == 'ordersRow') {
                return false;
            } else {
                $(this).find('input[type=checkbox]').attr('checked', $(obj).is(':checked'));
            }
        }
    )
}

//��ѡ�߼�
function checkChild(obj) {
    if ($(obj).is(':checked')) {
        $(obj).parent().parent().prevAll().each(function () {
            if ($(this).attr('class') == 'ordersRow') {
                $(this).find('input[type=checkbox]').attr('checked', true);
                return false;
            }
        })
    } else {
        var checkFlag = false;
        var $fatherRow = $(obj).parent().parent().prevAll('.ordersRow').eq(0);

        $fatherRow.nextAll().each(function () {
            if ($(this).attr('class') == 'ordersRow') {
                return false;
            } else {
                if ($(this).find('input[type=checkbox]').is(':checked')) {
                    checkFlag = true;
                    return false;
                }
            }
        })

        $fatherRow.find('input[type=checkbox]').attr('checked', checkFlag);
    }

}

function pharChooseProblem(obj) {
    var $t = $(obj).parents('.errorInfo');
    if ($(obj).is(':checked')) {
        $t.find('.case_type_phar textarea').val($t.find('.case_type_phar textarea').val() + $(obj).val())
    } else {
        $t.find('.case_type_phar textarea').val($t.find('.case_type_phar textarea').val().replace($(obj).val(), ''));
    }
}

function openPresDetail(id, newTag, pres_date) {
    window.open('PrescEvaluate/interveneDetail_new.action?id=' + id + '&newTag=1&queryFlag=1&pres_date=' + pres_date);
//    window.focus();
}

/**
 * 2019-05-04
 * ������ƴ�ӵ�����ѡ��Ĵ�����
 */
function setDeptIntoChart(unSelectedChart, selectedChart, unSelectedDeptList, selectedDeptList, branchNameList, branchName) {
    var containStar = false;    //  ҩʦ�Ƿ�ѡ��ȫ������

    $("#branchMenu tbody").html("<tr id=\"allBranch\"><td onclick=\"chooseBranch(this, '')\">ȫ��Ժ��</td></tr>");
    for (var i = 0; i < branchNameList.length; i++) {
        $("#branchMenu tbody").append("" +
            "<tr id=\""+branchNameList[i]+"\">" +
            "   <td onclick=\"chooseBranch(this, '"+branchNameList[i]+"')\">"+branchNameList[i]+"</td>" +
            "</tr>");
    }
    if ("" == branchName) {
        branchName = "allBranch";
    }
    $("#"+branchName).siblings().removeClass("chosenBranchTd");
    $("#"+branchName).addClass("chosenBranchTd");

    if (selectedChart.find("tr").length == 0) {
        for (var i = 0; i < selectedDeptList.length; i++) {
            if (selectedDeptList[i].deptCode == "*") {
                selectedChart.html("" +
                    "<tr class='allDept' onclick='deleteDept(this)'>" +
                    "   <td>ȫ������</td>" +
                    "   <td style='display: none;'>*</td>" +
                    "   <td style='display: none;'></td>" +
                    "</tr>");
                break;
            } else if (selectedDeptList[i].deptCode.indexOf("-*") != -1) {
                selectedChart.append("" +
                    "<tr class='allDept' onclick='deleteDept(this)'>" +
                    "   <td>"+selectedDeptList[i].deptName+"</td>" +
                    "   <td style='display: none;'>"+selectedDeptList[i].deptCode+"</td>" +
                    "   <td style='display: none;'></td>" +
                    "</tr>");
            } else {
                selectedChart.append("" +
                    "<tr onclick='deleteDept(this)'>" +
                    "   <td>"+selectedDeptList[i].deptName+"</td>" +
                    "   <td style='display: none;'>"+selectedDeptList[i].deptCode+"</td>" +
                    "   <td style='display: none;'>"+selectedDeptList[i].inputCode+"</td>" +
                    "</tr>");
            }
        }
    }

    unSelectedChart.html("");

    selectedChart.find("tr").each(function(index, obj) {
        var temp = $(obj).children().eq(1).html();
        if ("allBranch" == branchName && temp == "*") {
            containStar = true;
        } else {
            var deptCode = branchName + "-*";
            if (deptCode == temp) {
                containStar = true;
            }
        }
    });

    if (!containStar) {
        unSelectedChart.append("");
        if ("allBranch" == clickWhichBranch) {
            unSelectedChart.append("<tr onclick='addDept(this)'><td>ȫ������</td><td style='display: none;'>*</td><td style='display: none;'></td></tr>");
        } else {
            unSelectedChart.append("<tr onclick='addDept(this)'><td>��"+branchName+"����ȫ������</td><td style='display: none;'>"+ branchName +"-*</td><td style='display: none;'></td></tr>");
        }
    }

    for (var i = 0; i < unSelectedDeptList.length; i++) {
        unSelectedChart.append("" +
            "<tr onclick='addDept(this)'>" +
            "   <td>" + unSelectedDeptList[i].dept_name + "</td>" +
            "   <td style='display: none'>" + unSelectedDeptList[i].dept_code + "</td>" +
            "   <td style='display: none'>" + unSelectedDeptList[i].input_code + "</td>" +
            "</tr>");
    }
}

function setDept() {
    setDeptCommon(clickWhichBranch)
    $('#modal-dept').click();
}

function setDeptCommon(branchName) {
    var phar = $("#pharId").val();
    $("#deptSearchInput").val("");
    var inHospital = $("#tag").val();
    if (branchName == "allBranch") {
        branchName = "";
    }
    AjaxInterface.getDept(phar, inHospital, branchName, function (blMessage) {
        setDeptIntoChart($("#timeMenu tbody"), $("#bigMenu tbody"), blMessage.data.recordList, blMessage.data.chooseDeptCode, blMessage.data.branchNameList, branchName)
    })
}

/**
 * 2019-01-13
 * �첽��ѯ�����ø�Ԥ�Ŀ���
 */
function searchDeptToIntervene(evt, elementID, obj) {
    evt = (evt) ? evt : ((window.event) ? window.event : "");
    var key = evt.keyCode?evt.keyCode:evt.which;
    if(key==38|key==40|key==13)
        return;

    var keyword = document.getElementById(elementID).value;
    keyword = $(obj).val();

    var inHospital = $("#tag").val();
    var chosenDeptCodeList = [];
    $("#bigMenu tbody").children().each(function () {
        $obj = $(this);
        var deptCode = $obj.children().eq(1).html();
        chosenDeptCodeList.push(deptCode);
    })

    AjaxInterface.getDeptByKeyWord(inHospital, keyword, chosenDeptCodeList, function (blMessage) {
        var dataList = blMessage.data;
        var $timeMenu = $("#timeMenu tbody");
        $timeMenu.html("");

        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            $timeMenu.append("<tr onclick='addDept(this)'>" +
                "<td>" + data.dept_name + "</td>" +
                "<td style='display: none'>" + data.dept_code + "</td>" +
                "<td style='display: none'>" + data.input_code + "</td>" +
                "</tr>");
        }
    })
}

/**
 * 2019-01-26
 * ���Ѿ�ѡ�еĿ����в�ѯ�����Ʒ��ϲ�ѯ�ؼ��ʵĿ�����ʾ����
 * �ﵽһ�ֺ���������������Ч��
 * ��ʵ����ǰ̨���
 */
function searchInSelectedDept(evt, elementID, table) {
    evt = (evt) ? evt : ((window.event) ? window.event : "");
    var key = evt.keyCode?evt.keyCode:evt.which;
    if(key==38|key==40|key==13)
        return;

    var keyword = document.getElementById(elementID).value;

    //  ���ж��Ƿ�ȫΪ��ĸ
    var isLetters = /^[a-zA-Z]+$/.test(keyword);
    if (isLetters) {
        //  ���ȫΪ��ĸ����ת�ɴ�д��������ƥ��
        keyword = keyword.toUpperCase();
    }

    $("#"+table).children().each(function () {
        var deptName = $(this).children().eq(0).html();
        var inputCode = $(this).children().eq(2).html();
        if (deptName.indexOf(keyword) != -1 || inputCode.indexOf(keyword) != -1) {
            $(this).children().eq(0).css('display', 'block');
        } else {
            $(this).children().eq(0).css('display', 'none');
        }
    })

}

/**
 * 2018-05-28
 * ҩʦ���ø��˵ĸ�Ԥ����
 * @param phar
 */
function setProblemLevel(pharmacistId) {
    var inHospital = $("#tag").val();
    $("input[name='problem_level_1']").prop('checked', false);
    $("input[name='problem_level_2']").prop('checked', false);
    AjaxInterface.getProblemLevel(pharmacistId, inHospital, function (blMessage) {
        var dataList = blMessage.data;
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            $("input[name='problem_level_"+data+"']").prop('checked', true);
        }
    })
    $('#modal-problem_level').click();
}

/**
 * 2018-09-19
 * Ҫ�����ø��˵ĸ�Ԥ��������
 * @param phar
 */
function setProblemType(phar) {
    var inHospital = $("#tag").val();
    AjaxInterface.getProblemType(userId, inHospital, function (blMessage) {
        var chosenList = blMessage.data;
        var chosenMenu = $("#chosenMenu tbody");
        chosenMenu.html("");

        for (var i = 0; i < chosenList.length; i++) {
            var data = chosenList[i];
            chosenMenu.append("<tr onclick='addProblemType(this)'><td>" + data + "</td></tr>");
        }

        var unChosenList = blMessage.b;
        var unChosenMenu = $("#unChosenMenu tbody");
        unChosenMenu.html("");

        for (var i = 0; i < unChosenList.length; i++) {
            var data = unChosenList[i];
            unChosenMenu.append("<tr onclick='deleteProblemType(this)'><td>" + data + "</td></tr>");
        }
    })
    $('#modal-problem-type').click();
}

function getCommonExp(inHospital, zoneId, tableId, textareaId) {
    var pharId = $("#pharId").val();
    if ("block" == $("#"+zoneId).css("display"))
        $("#"+zoneId).css("display", "none");
    else {
        $("#"+zoneId).css("display", "block");
        $("#"+tableId+" tbody").html("");
        AjaxInterface.getCommonExp(inHospital,pharId, function (blMessage) {
            var expList = blMessage.data;
            for (var i = 0; i < expList.length; i++) {
                var data = expList[i];
                $("#"+tableId).append("" +
                    "<tr ondblclick=\"chooseExp2Textarea(this, '"+zoneId+"', '"+textareaId+"')\">" +
                    "   <td>" + data.expression + "</td>" +
                    "   <td style='display: none'>" + data.input_code + "</td>" +
                    "</tr>");
            }
        });
    }
}

function chooseExp2Textarea(obj, zoneId, textareaId) {
    var select_exp = $(obj).find("td:first").html();
    if ("" != select_exp && undefined != select_exp) {

        var inputText = $("#"+textareaId).val();
        $("#"+textareaId).val(inputText + select_exp);
        $("#"+textareaId).text(inputText + select_exp);

        $("#"+zoneId).css("display", "none");
    }
}

//  ���һ��������
function addCommonExp(inHospital){
    var add_exp = prompt("�������µĳ�����", "");
    var add_exp = add_exp.trim();
    if (add_exp) {
        if (blMessage.success) {
            if (1 == blMessage.data) {
                $("#common_exp_select").find("option").attr("selected", false);
                $("#common_exp_select").find("option[value = '" + add_exp + "']").attr("selected", true);
                alert("�ó������Ѵ��ڣ�����������ɫѡ�");
            } else {
                alert("��ӳɹ���");
                $("#inputText").val(add_exp);
                var $select = $("#common_exp_select");
                var $option = $("<option title='"+add_exp+"' value='"+add_exp+"' selected='selected'>"+add_exp+"</option>");
                $select.prepend($option);
            }
        } else {
            alert("������ϣ������ԣ�");
        }
    }
}

function deleteCommonExp(inHospital){
    var $options = $("#common_exp_select option:selected");
    if ($options.length <= 0 ) {
        alert("��ѡ��Ҫɾ���ĳ�����ٵ��ɾ����ť��");
    } else {
        if (!confirm("ȷ��ɾ��ѡ�еĳ�������"))
            return;
        var deleteExps = "";
        for (var i = 0; i < $options.length; i++) {
            deleteExps += "'" +$options[i].value+ "'";
            if (i < $options.length - 1)
                deleteExps += ", ";
        }
        AjaxInterface.deleteCommExp(deleteExps, inHospital, function (blMessage) {
            if (blMessage.success) {
                $options.remove();
                alert("ɾ���ɹ���");
            } else
                alert("������ϣ������ԣ�");
        });
    }
}

$(document).ready(function(){
    //  ����ѡ��һ�����������ֵ��inputText���У�Ȼ�󽫳�������������ʾ
    $('#common_exp_select').dblclick(function(){
        var select_exp = $('option:selected', this).val();
        if ("" != select_exp && undefined != select_exp) {
            $("#inputText").val(select_exp);
            var modifyAdvice = $("#modifyAdvice").text();
            $("#modifyAdvice").text(modifyAdvice + select_exp);
            $("#common_exp_zone").css("display", "none");
        }
    });

    //  ������ý��㣬Ҳ����������������
    $('#inputText').focus(function (){
        $("#common_exp_zone").css("display", "none");
    });
});


/**
 * 2019-05-04
 * �첽���ҳ�����
 */
function searchCommonExpressionAsync(evt, elementID, tableId) {
    evt = (evt) ? evt : ((window.event) ? window.event : "");
    var key = evt.keyCode?evt.keyCode:evt.which;
    if(key==38|key==40|key==13)
        return;

    var keyword = document.getElementById(elementID).value;
    //if (key)

    $("#"+tableId+" tbody tr").each(function () {
        var value;

        //  ���ж��Ƿ�ȫΪ��ĸ
        var isLetters = /^[a-zA-Z]+$/.test(keyword);
        if (isLetters) {
            //  ���ȫΪ��ĸ����ת�ɴ�д��������ƥ��
            keyword = keyword.toUpperCase();
            value = $(this).children().eq(1).html();
        } else {
            value = $(this).children().eq(0).html();
        }

        if ("" == keyword || value.indexOf(keyword) != -1) {
            $(this).children().eq(0).css("display", "block")
        } else {
            $(this).children().eq(0).css("display", "none")

        }
    })
}



