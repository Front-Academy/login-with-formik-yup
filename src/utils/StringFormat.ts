export class StringFormat {
  static removeMaskCPForCNPJ(number: string) {
    return number.replace(/(\.|\/|-)/g, "");
  }

  static removeMaskNumber(value: string) {
    return value.replace(/(\.|\/|-|\(|\))/g, "");
  }

  static formatPhone(phone: string) {
    const rawPhone = phone.replace(/\D/g, "");

    phone = rawPhone
      .replace(/\D/g, "")
      .replace(/(\d{10,11})(.*)/g, "$1")
      .replace(/^(\d{2})(\d)/g, "($1)$2");

    const regex =
      rawPhone.length < 11
        ? /^(\(\d{2}\))(\d{4})(\d)/g
        : /^(\(\d{2}\))(\d{5})(\d)/g;

    return phone.replace(regex, "$1 $2-$3");
  }

  static formatCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1-$2");
    cpf = cpf.replace(/([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})(.*)/, "$1");
    return cpf;
  }

  static formatCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
    return cnpj;
  }

  static formatCEP(cep: string) {
    cep = cep.replace(/\D/g, "");
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2");
    cep = cep.replace(/\.(\d{3})(\d)/, "$1-$2");
    return cep;
  }

  static formatCurrency(currency: string) {
    try {
      currency = currency.toString().replace(".", ",");
      if (currency.toLocaleString().indexOf(",") >= 0) {
        return currency
          .toString()
          .split(/(?=(?:\d{3})+(?:,|$))/g)
          .join(".");
      }

      return currency
        .toString()
        .split(/(?=(?:\d{3})+(?:.|$))/g)
        .join(",");
    } catch (ex) {
      return "erro";
    }
  }
}
