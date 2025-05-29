Feature: Homepage Functionality

  Scenario: Usuário faz login e vê a nova janela
    Given que estou na página de login
    When preencho o login e a senha
    When clico no botão de login
    Then vejo o conteúdo na nova janela
    