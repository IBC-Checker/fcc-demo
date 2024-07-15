<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:utils="xalan://com.misys.portal.common.tools.Utils"
				exclude-result-prefixes="utils">
	<xsl:template name="product-additional-fields">	
	    <xsl:if test = "HijriExpDate">
	          <additional_field name="HijriExpDate" type="string" scope="master" description="Type">
	              <xsl:value-of select="HijriExpDate" />
	          </additional_field>
	    </xsl:if>
	</xsl:template>
</xsl:stylesheet>
