<?xml version="1.0" encoding="UTF-8"?>
<!--
##########################################################
Templates that are common to all Letter of Credit forms (i.e. LC, SI, EL, SR).
This is divided into three sections; the first lists common templates
for the customer side, the second common templates for the bank side and the third
templates common to both.

Letter of Credit forms should import this template after importing
trade_common.xsl (on the customer side) or bank_common.xsl (on the bank
side).

Copyright (c) 2000-2008 Misys (http://www.misys.com),
All Rights Reserved. 

version:   1.0
date:      12/03/08
author:    Cormac Flynn
email:     cormac.flynn@misys.com
##########################################################
-->
<!DOCTYPE xsl:stylesheet [
  <!ENTITY nbsp "&#160;">
]>
<xsl:stylesheet 
  version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:localization="xalan://com.misys.portal.common.localization.Localization"
  xmlns:utils="xalan://com.misys.portal.common.tools.Utils"
  xmlns:security="xalan://com.misys.portal.security.GTPSecurity"
  exclude-result-prefixes="localization utils security"></xsl:stylesheet>